// @flow

const fs = require('fs');
const jwt = require('express-jwt');
const shortId = require('shortid');
const bodyParser = require('body-parser');
const multer = require('multer')();
const streamifier = require('streamifier');
const Logger = require('./logger');
const secretConfig = require('../config/secret.config.json');
const stripe = require('stripe')(secretConfig.PAYMENT_SECRET || process.env.PAYMENT_SECRET);
const esrGenerator = require('./esr/esrGenerator');
const mail = require('./mail');

const {
  Invoice,
  Order,
  OrderState,
  Producer,
  Product,
  ProductCategory,
  ProductPictures,
  Supplier,
  Tag,
  UserAddress,
} = require('./models');

const authorization = jwt({
  secret: process.env.SECRET || secretConfig.SECRET,
  audience: process.env.AUDIENCE || secretConfig.AUDIENCE,
});

function isAdmin(req /* : express$Request */,
                 res /* : express$Response */,
                 next /* : express$NextFunction */) {
  if (!req.user || req.user.app_metadata.roles.indexOf('admin') === -1) {
    res.sendStatus(403);
  } else {
    next();
  }
}

function handleGenericError(error, response) {
  Logger.error(error);
  response.status(500).send(error);
}

function saveOrUpdate(Collection, document) {
  if (document._id) {
    return Collection.findOneAndUpdate({ _id: document._id }, document, { upsert: true }).exec();
  }
  return new Collection(document).save();
}

function updateProductStocks(items) {
  items.forEach(({ amount, product }) =>
    Product.update({ _id: product._id }, { $inc: { stock: amount * -1 } }).exec()
  );
}

module.exports = {
  registerEndpoints(app /* : express$Application */) {
    app.post('/api/products/pictures', authorization, isAdmin, multer.any(),
      (req /* : express$Request */, res /* : express$Response */) =>
        Promise.all(req.files.map(file =>
          new Promise((resolve, reject) =>
            ProductPictures.write(
              {
                filename: `${shortId.generate()}.${file.originalname.split(/[. ]+/).pop()}`,
                contentType: file.mimetype,
              },
              streamifier.createReadStream(file.buffer),
              (error, createdFile) => (error ? reject(error) : resolve(createdFile._id))
            )
          )
        ))
          .then(files => res.status(200).send(JSON.stringify(files)))
          .catch(error => handleGenericError(error, res))
    );

    app.delete('/api/products/pictures/:id', authorization, isAdmin,
      (req /* : express$Request */, res /* : express$Response */) =>
        ProductPictures.remove({ _id: req.params.id })
          .then(() => Product.update({}, { $pull: { files: req.params.id } }, { multi: true }))
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res))
    );

    app.put('/api/products', authorization, isAdmin, bodyParser.json(),
      (req /* : express$Request */, res /* : express$Response */) =>
        saveOrUpdate(Product, req.body)
          .then(() => res.sendStatus(200))
          .catch(handleGenericError)
    );

    app.put('/api/tags', authorization, isAdmin, bodyParser.json(),
      (req /* : express$Request */, res /* : express$Response */) =>
        saveOrUpdate(Tag, req.body)
          .then(() => res.sendStatus(200))
          .catch(handleGenericError)
    );

    app.put('/api/productcategories', authorization, isAdmin, bodyParser.json(),
      ({ body } /* : express$Request */, res /* : express$Response */) => {
        const promises = [];
        if (body._id) {
          ProductCategory.findOne({ _id: body._id })
            .then(({ name }) => {
              if (name !== body.name) {
                promises.push(ProductCategory.update(
                  { parentCategory: name },
                  { $set: { parentCategory: body.name } },
                  { multi: true }).exec());
              }
            });
        }
        promises.push(saveOrUpdate(ProductCategory, body));
        Promise.all(promises)
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res));
      });

    app.put('/api/suppliers', authorization, isAdmin, bodyParser.json(),
      (req /* : express$Request */, res /* : express$Response */) =>
        saveOrUpdate(Supplier, req.body)
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res))
    );

    app.put('/api/producers', authorization, isAdmin, bodyParser.json(),
      (req /* : express$Request */, res /* : express$Response */) =>
        saveOrUpdate(Producer, req.body)
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res))
    );

    app.put('/api/orders', authorization, bodyParser.json(),
      (req /* : express$Request */, res /* : express$Response */) =>
        saveOrUpdate(Order, Object.assign(
          req.body,
          {
            user: req.user.user_id,
            state: OrderState.STARTED,
            date: Date.now(),
          }
        ))
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res))
    );

    app.put('/api/userAddress', authorization, bodyParser.json(),
      (req /* : express$Request */, res /* : express$Response */) =>
        saveOrUpdate(UserAddress, Object.assign(
          req.body,
          { user: req.user.user_id }
        ))
          .then(address => res.status(200).send(address._id))
          .catch(error => handleGenericError(error, res))
    );

    app.get('/api/userAddresses', authorization,
      (req /* : express$Request */, res /* : express$Response */) =>
        UserAddress.find({ user: req.user.user_id }, { user: 0 })
          .then(addresses => res.status(200).send(JSON.stringify(addresses)))
          .catch(error => handleGenericError(error, res))
    );

    app.post('/api/payment/cleared', bodyParser.json(), authorization,
      (req /* : express$Request */, res /* : express$Response */) => {
        const orderQuery = Order.findOne({ _id: req.body.shoppingCartId, user: req.user.user_id });

        orderQuery
          .then(order =>
            stripe.charges.create({
              amount: order.items.reduce(
                (sum, { amount, product }) => sum + (amount * product.price * 100), 0
              ),
              description: order._id,
              currency: 'chf',
              source: req.body.token.id,
            })
              .then(() => updateProductStocks(order.items))
          )
          .then(() => orderQuery.update({ state: OrderState.FINISHED }))
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res));
      }
    );

    app.post('/api/payment/prepayment', bodyParser.json(), authorization,
      (req /* : express$Request */, res /* : express$Response */) =>
        Order.findOneAndUpdate({
          _id: req.body.shoppingCartId,
          user: req.user.user_id,
        }, {
          $set: {
            state: OrderState.WAITING,
          },
        })
          .then(({ address, items }) => {
            updateProductStocks(items);
            return new Invoice({
              value: items.reduce((sum, { amount, product }) => sum + (amount * product.price), 0),
              address,
            }).save();
          })
          .then(invoice =>
            esrGenerator.generate(
              invoice.invoiceNumber,
              req.body.shoppingCartId,
              invoice.value,
              invoice.address
            )
              .then(pdfPath =>
                mail.sendESR(req.body.shoppingCartId, req.user.email, pdfPath)
                  .then(fs.unlink(pdfPath))
              )
          )
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res))
    );
  },
};
