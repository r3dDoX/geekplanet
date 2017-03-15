/* @flow */

const jwt = require('express-jwt');
const shortId = require('shortid');
const bodyParser = require('body-parser');
const multer = require('multer')();
const streamifier = require('streamifier');
const secretConfig = require('../config/secret.config.json');
const stripe = require('stripe')(secretConfig.PAYMENT_SECRET);

const {
  Order,
  Producer,
  Product,
  ProductCategory,
  ProductPictures,
  Supplier,
} = require('./models');

const parseAddress = ({ streetName, houseNumber, zip, city }) => ({
  streetName,
  houseNumber,
  zip,
  city,
});

const authorization = jwt({
  secret: process.env.SECRET || secretConfig.SECRET,
  audience: process.env.AUDIENCE || secretConfig.AUDIENCE,
});

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.app_metadata.roles.indexOf('admin') === -1) {
    res.sendStatus(403);
    return;
  }
  next();
};

module.exports = {
  registerEndpoints(app) {
    app.post('/api/productcategories', multer.none(), authorization, isAdmin, (req, res) => {
      new ProductCategory(req.body).save()
        .then(() => res.sendStatus(200))
        .catch(error => res.send(error));
    });

    app.post('/api/products', multer.any(), authorization, isAdmin, (req, res) => {
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
        .then((files) => {
          const productWithFiles = Object.assign(req.body, { files });
          return new Product(productWithFiles).save().then(() => res.sendStatus(200));
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Failed to save product and/or pictures!');
        });
    });

    app.post('/api/suppliers', multer.none(), authorization, isAdmin, (req, res) => {
      const supplier = req.body;
      supplier.address = parseAddress(supplier);

      new Supplier(supplier).save()
        .then(() => res.sendStatus(200))
        .catch(error => res.send(error));
    });

    app.post('/api/producers', multer.none(), authorization, isAdmin, (req, res) => {
      const producer = req.body;
      producer.address = parseAddress(producer);

      new Producer(producer).save()
        .then(() => res.sendStatus(200))
        .catch(error => res.send(error));
    });

    app.post('/api/orders', bodyParser.json(), authorization, (req, res) => {
      const order = req.body;
      order._id = order.id;
      order.user = req.user.user_id;

      new Order(order).save()
        .then(() => res.sendStatus(200))
        .catch(error => res.send(error));
    });

    app.delete('/api/orders/:id', authorization, (req, res) =>
      Order.remove({ _id: req.params.id, user: req.user.user_id })
        .then(() => res.sendStatus(200))
        .catch(error => res.send(error))
    );

    app.post('/api/payment', bodyParser.json(), authorization, (req, res) => {
      const amount = 22000;
      Order.findOneAndUpdate({ _id: req.params.id, user: req.user.user_id }, { state: 'FINISHING' })
        .then(order => console.log(order));

      stripe.customers.create({
        email: req.user.email,
        source: req.body.token.id,
      })
        .then(customer =>
          stripe.charges.create({
            amount,
            description: 'Sample Charge',
            currency: 'chf',
            customer: customer.id,
          }))
        .then(() => res.sendStatus(200))
        .catch(error => console.error(error));
    });
  },
};
