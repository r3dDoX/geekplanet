const fs = require('fs');
const { authorization, isAdmin } = require('./auth');
const bodyParser = require('body-parser');
const Logger = require('../logger');
const envConfig = require('../../config/envConfig');
const stripe = require('stripe')(envConfig.getSecretKey('PAYMENT_SECRET'));
const esrGenerator = require('../esr/esrGenerator');
const mail = require('../email/mail');
const { saveOrUpdate, handleGenericError } = require('../db/mongoHelper');
const esrCodeHelpers = require('../esr/esrCodeHelpers');

const orderConfig = envConfig.getEnvironmentSpecificConfig().ORDER;

const OrderState = require('../../common/orderState');
const {
  Invoice,
  Order,
  Product,
  UserAddress,
} = require('../db/models');

function updateProductStocks(items) {
  items.forEach(({ amount, product }) =>
    Product.update({ _id: product._id }, { $inc: { stock: amount * -1 } }).exec()
  );
}

module.exports = {
  registerEndpoints(app) {
    app.get('/api/orders', authorization, isAdmin,
      (req, res) =>
        Order.find().sort({ date: -1 })
          .then(orders => Promise.all(orders.map((order) => {
            if (order.invoice) {
              return Invoice.findOne({ _id: order.invoice })
                .then(invoice => Object.assign({}, order.toObject(), {
                  esr: invoice.esr,
                }));
            }

            return order;
          })))
          .then(orders => res.send(orders))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching orders failed!');
          })
    );

    app.put('/api/orders', authorization, bodyParser.json(),
      (req, res) => {
        const itemPromises = req.body.items.map(
          item => Product.findOne({ _id: item.product._id })
            .then(product => ({
              amount: item.amount,
              product,
            }))
        );

        Promise.all(itemPromises).then((items) => {
          const itemTotal = items.reduce(
            (sum, { amount, product }) => ((sum * 100) + ((amount * product.price) * 100)) / 100,
            0
          );

          saveOrUpdate(Order, Object.assign(
            req.body,
            {
              user: req.user.sub,
              state: OrderState.STARTED,
              date: Date.now(),
              items,
              itemTotal,
              total: itemTotal < orderConfig.MIN_PRICE_SHIPPING ?
                itemTotal + orderConfig.SHIPPING_COST :
                itemTotal,
            }
          ))
            .then(() => res.sendStatus(200))
            .catch(error => handleGenericError(error, res));
        });
      }
    );

    app.post('/api/order/sent', authorization, isAdmin, bodyParser.json(), (req, res) =>
      Order.findOneAndUpdate({ _id: req.body.orderId }, { $set: { state: OrderState.SENT } })
        .then(() => res.sendStatus(200))
        .catch(error => handleGenericError(error, res))
    );

    app.put('/api/userAddress', authorization, bodyParser.json(),
      (req, res) =>
        saveOrUpdate(UserAddress, Object.assign(
          req.body,
          { user: req.user.sub }
        ))
          .then(address => res.status(200).send(address._id))
          .catch(error => handleGenericError(error, res))
    );

    app.get('/api/userAddresses', authorization,
      (req, res) =>
        UserAddress.find({ user: req.user.sub }, { user: 0 })
          .then(addresses => res.status(200).send(JSON.stringify(addresses)))
          .catch(error => handleGenericError(error, res))
    );

    app.post('/api/payment/cleared', bodyParser.json(), authorization,
      (req, res) => {
        Order.findOne({ _id: req.body.shoppingCartId, user: req.user.sub })
          .then(order =>
            stripe.charges.create({
              amount: order.total * 100,
              description: order._id,
              currency: 'chf',
              source: req.body.token.id,
            })
              .then(() => updateProductStocks(order.items))
          )
          .then(() =>
            Order.findOneAndUpdate(
              { _id: req.body.shoppingCartId, user: req.user.sub },
              { $set: { state: OrderState.FINISHED } },
              { new: true }
            )
              .then(order => mail.sendConfirmation(order, req.user.email))
          )
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res));
      }
    );

    app.post('/api/payment/prepayment', bodyParser.json(), authorization, (req, res) =>
      new Invoice({
        user: req.user.sub,
      }).save()
        .then(invoice =>
          Order.findOneAndUpdate(
            { _id: req.body.shoppingCartId, user: req.user.sub },
            { $set: { state: OrderState.WAITING, invoice: invoice._id } },
            { new: true })
        )
        .then((order) => {
          const { address, items, total } = order;
          updateProductStocks(items);

          return Invoice.findOneAndUpdate(
            { _id: order.invoice },
            { $set: { value: total, address } },
            { new: true })
            .then((invoice) => {
              const esr = esrCodeHelpers.generateInvoiceNumberCode(invoice.invoiceNumber);

              return esrGenerator.generate(
                esr,
                order._id,
                invoice.value,
                invoice.address,
              ).then(pdfPath =>
                Promise.all([
                  mail.sendESR(order, req.user.email, pdfPath).then(fs.unlink(pdfPath)),
                  Invoice.findOneAndUpdate({ _id: invoice._id }, { $set: { esr } }),
                ])
              );
            });
        })
        .then(() => res.sendStatus(200))
        .catch(error => handleGenericError(error, res))
    );

    app.post('/api/payment/prepayment/cleared', bodyParser.json(), authorization, isAdmin,
      (req, res) => Order.findOneAndUpdate({ _id: req.body.orderId }, {
        $set: {
          state: OrderState.FINISHED,
        },
      }).then(() => res.sendStatus(200))
    );
  },
};
