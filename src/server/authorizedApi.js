/* @flow */

const jwt = require('express-jwt');
const shortId = require('shortid');
const bodyParser = require('body-parser');
const multer = require('multer')();
const streamifier = require('streamifier');
const secretConfig = require('../config/secret.config.json');
const stripe = require('stripe')(secretConfig.PAYMENT_SECRET || process.env.PAYMENT_SECRET);

const {
  Order,
  OrderState,
  Producer,
  Product,
  ProductCategory,
  ProductPictures,
  Supplier,
  UserAddress,
} = require('./models');

const authorization = jwt({
  secret: process.env.SECRET || secretConfig.SECRET,
  audience: process.env.AUDIENCE || secretConfig.AUDIENCE,
});

function isAdmin(req, res, next) {
  if (!req.user || req.user.app_metadata.roles.indexOf('admin') === -1) {
    res.sendStatus(403);
    return;
  }
  next();
}

function handleGenericError(error, response) {
  console.error(error);
  response.status(500).send(error);
}

function saveOrUpdate(Colleciton, document) {
  if (document._id) {
    return Colleciton.findOneAndUpdate({ _id: document._id }, document);
  }
  return new Colleciton(document).save();
}

module.exports = {
  registerEndpoints(app) {
    app.post('/api/products/pictures', authorization, isAdmin, multer.any(), (req, res) =>
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
        .catch(handleGenericError)
    );

    app.put('/api/products', authorization, isAdmin, bodyParser.json(), (req, res) =>
        saveOrUpdate(Product, req.body)
          .then(() => res.sendStatus(200))
          .catch(handleGenericError)
    );

    app.put('/api/productcategories', authorization, isAdmin, bodyParser.json(), (req, res) =>
      saveOrUpdate(ProductCategory, req.body)
        .then(() => res.sendStatus(200))
        .catch(error => handleGenericError(error, res))
    );

    app.put('/api/suppliers', authorization, isAdmin, bodyParser.json(), (req, res) =>
      saveOrUpdate(Supplier, req.body)
        .then(() => res.sendStatus(200))
        .catch(error => handleGenericError(error, res))
    );

    app.put('/api/producers', authorization, isAdmin, bodyParser.json(), (req, res) =>
      saveOrUpdate(Producer, req.body)
        .then(() => res.sendStatus(200))
        .catch(error => handleGenericError(error, res))
    );

    app.post('/api/orders', authorization, bodyParser.json(), (req, res) => {
      const order = req.body;
      order._id = order.id;
      order.user = req.user.user_id;
      order.state = OrderState.STARTED;

      new Order(order).save()
        .then(() => res.sendStatus(200))
        .catch(error => handleGenericError(error, res));
    });

    app.post('/api/userAddress', authorization, bodyParser.json(), (req, res) => {
      const userAddress = req.body;
      userAddress.user = req.user.user_id;

      new UserAddress(userAddress).save()
        .then(address => res.status(200).send(address._id))
        .catch(error => handleGenericError(error, res));
    });

    app.get('/api/userAddresses', authorization, (req, res) =>
      UserAddress.find({ user: req.user.user_id }, { user: 0 })
        .then(addresses => res.status(200).send(JSON.stringify(addresses)))
        .catch(error => handleGenericError(error, res))
    );

    app.post('/api/payment', bodyParser.json(), authorization, (req, res) => {
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
          }))
        .then(() => orderQuery.update({ state: OrderState.FINISHED }))
        .then(() => res.sendStatus(200))
        .catch(error => handleGenericError(error, res));
    });
  },
};
