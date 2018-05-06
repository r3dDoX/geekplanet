const fs = require('fs');
const { authorization, isAdmin } = require('./auth');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const envConfig = require('../../config/envConfig');
const stripe = require('stripe')(envConfig.getSecretKey('PAYMENT_SECRET'));
const esrGenerator = require('../esr/esrGenerator');
const mail = require('../email/mail');
const Logger = require('../logger');
const { saveOrUpdate } = require('../db/mongoHelper');
const esrCodeHelpers = require('../esr/esrCodeHelpers');
const PaymentMethod = require('../../common/paymentMethod');

const orderConfig = envConfig.getEnvironmentSpecificConfig().ORDER;
const priceCalculation = require('../../common/priceCalculation')
  .create(orderConfig.MIN_PRICE_SHIPPING, orderConfig.SHIPPING_COST);

const OrderState = require('../../common/orderState');
const {
  Coupon,
  Invoice,
  Order,
  Product,
  UserAddress,
} = require('../db/models');

function updateProductStocks(items) {
  return Promise.all(items.map(({ amount, product }) =>
    Product.update({ _id: product._id }, { $inc: { stock: amount * -1 } }).exec()
  ));
}

function updateCoupons(itemTotal, coupons) {
  const updatedCoupons = priceCalculation.getRemainingCouponsAmount(itemTotal, coupons);
  return Promise.all(updatedCoupons.map(coupon => Coupon
    .findOneAndUpdate({ _id: coupon._id }, { $set: { amount: coupon.amount } })
    .exec()
  ));
}

async function createAndSendEsr(order, email) {
  const { address, total } = order;

  const invoice = await Invoice.findOneAndUpdate(
    { _id: order.invoice },
    { $set: { value: total, address } },
    { new: true });

  const esr = esrCodeHelpers.generateInvoiceNumberCode(invoice.invoiceNumber);
  const pdfPath = await esrGenerator.generate(esr, order._id, invoice.value, address);

  await mail.sendESR(order, email, pdfPath);
  fs.unlink(pdfPath, err => err && Logger.error(err));
  await Invoice.findOneAndUpdate({ _id: invoice._id }, { $set: { esr } });
}

async function mapDbProductsToClientItems(clientItems) {
  const products = await Product.find({
    _id: { $in: clientItems.map(item => item.product._id) },
  });
  return clientItems.map((item) => {
    item.product = products.find(product => product.id === item.product._id);
    return item;
  });
}

async function mapDbCouponsToClientCoupons(clientCoupons) {
  return Coupon.find({
    _id: { $in: clientCoupons.map(coupon => coupon._id) },
  });
}

async function chargeCreditCard(order, userId) {
  await stripe.charges
    .create({
      amount: order.total * 100,
      description: order._id,
      currency: 'chf',
      source: userId,
    })
    .catch(({ message, detail }) => Promise.reject(new Error(`${message} ${detail || ''}`)));
}

module.exports = {
  registerEndpoints(app) {
    app.get('/api/orders', authorization, isAdmin, asyncHandler(async (req, res) => {
      const orders = await Order.find().sort({ date: -1 });

      const updatedOrders = await Promise.all(orders.map(async (order) => {
        if (order.invoice) {
          const invoice = Invoice.findOne({ _id: order.invoice });
          return Object.assign({}, order.toObject(), {
            esr: invoice.esr,
          });
        }

        return order;
      }));

      res.send(updatedOrders);
    }));

    app.put('/api/orders', authorization, bodyParser.json(), asyncHandler(async (req, res) => {
      const items = await mapDbProductsToClientItems(req.body.items);
      const coupons = await mapDbCouponsToClientCoupons(req.body.coupons);
      const itemTotal = priceCalculation.calculateItemTotal(items);

      await saveOrUpdate(Order, Object.assign(
        req.body,
        {
          _id: req.body.id,
          user: req.user.sub,
          state: OrderState.STARTED,
          date: Date.now(),
          items,
          coupons,
          itemTotal,
          total: priceCalculation.calculateGrandTotal(itemTotal, coupons),
        }
      ));
      res.sendStatus(200);
    }));

    app.post('/api/order/sent', authorization, isAdmin, bodyParser.json(),
      asyncHandler(async (req, res) =>
        Order
          .findOneAndUpdate({ _id: req.body.orderId }, { $set: { state: OrderState.SENT } })
          .then(() => res.sendStatus(200))));

    app.put('/api/userAddress', authorization, bodyParser.json(), asyncHandler(async (req, res) =>
      saveOrUpdate(UserAddress, Object.assign(req.body, { user: req.user.sub }))
        .then(address => res.status(200).send(address._id))));

    app.get('/api/userAddresses', authorization, asyncHandler(async (req, res) =>
      UserAddress
        .find({ user: req.user.sub }, { user: 0 })
        .then(addresses => res.status(200).send(JSON.stringify(addresses)))));

    app.post('/api/payment/prepayment/cleared', bodyParser.json(), authorization, isAdmin,
      asyncHandler(async (req, res) => Order
        .findOneAndUpdate(
          { _id: req.body.orderId },
          { $set: { state: OrderState.FINISHED } })
        .then(() => res.sendStatus(200))
      ));

    app.post('/api/order/:id/paymentMethod/:method', bodyParser.json(), authorization,
      asyncHandler(async (req, res) => {
        if (!req.params.method
          || !Object.prototype.hasOwnProperty.call(PaymentMethod, req.params.method.toUpperCase())
        ) {
          throw new Error('Selected payment method not supported');
        }

        await Order.findOneAndUpdate(
          {
            _id: req.params.id,
            user: req.user.sub,
            state: { $in: [OrderState.STARTED, OrderState.PAYMENT_METHOD_SELECTED] },
          },
          {
            $set: {
              state: OrderState.PAYMENT_METHOD_SELECTED,
              paymentMethod: PaymentMethod[req.params.method.toUpperCase()],
              paymentToken: req.body.token && req.body.token.id,
            },
          },
        );
        res.sendStatus(200);
      }));

    app.post('/api/order/:id/finish', bodyParser.json(), authorization,
      asyncHandler(async (req, res) => {
        let order = await Order.findOne({ _id: req.params.id, user: req.user.sub });

        if (order.state !== OrderState.PAYMENT_METHOD_SELECTED) {
          throw new Error('Order is not in the correct state to be finished');
        }

        if (order.paymentMethod === PaymentMethod.CREDIT_CARD) {
          await chargeCreditCard(order, order.paymentToken);
        } else if (order.paymentMethod === PaymentMethod.PREPAYMENT) {
          const invoice = await new Invoice({ user: req.user.sub }).save();
          order.invoice = invoice._id;
          order = await order.save();
        } else if (order.total > 0) {
          throw new Error('Payment method not allowed');
        }

        await updateCoupons(order.itemTotal, order.coupons);
        await updateProductStocks(order.items);
        res.sendStatus(200);

        if (order.paymentMethod === PaymentMethod.PREPAYMENT) {
          order.state = OrderState.WAITING;
          await createAndSendEsr(order, req.user.email);
        } else {
          order.state = OrderState.FINISHED;
          await mail.sendConfirmation(order, req.user.email);
        }
        await order.save();
      }));
  },
};
