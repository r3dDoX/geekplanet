const fs = require('fs');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const shortId = require('shortid');
const bodyParser = require('body-parser');
const multer = require('multer')();
const streamifier = require('streamifier');
const sharp = require('sharp');
const Logger = require('../logger');
const envConfig = require('../../config/envConfig');
const stripe = require('stripe')(envConfig.getSecretKey('PAYMENT_SECRET'));
const esrGenerator = require('../esr/esrGenerator');
const mail = require('../email/mail');
const mongoHelper = require('../db/mongoHelper');

const {
  Invoice,
  Order,
  OrderState,
  Producer,
  Product,
  ProductCategory,
  ProductPicturesCollection,
  Supplier,
  Tag,
  UserAddress,
} = require('../db/models');

const authorization = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: 'https://geekplanet.eu.auth0.com/.well-known/jwks.json',
  }),
  algorithms: ['RS256'],
});

function isAdmin(req, res, next) {
  if (!req.user || req.user['https://geekplanet.ch/roles'].indexOf('admin') === -1) {
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

function saveFileInSize(id, file, sizeTag, size) {
  return new Promise((resolve, reject) => {
    const writestream = mongoHelper.gridfs.createWriteStream({
      _id: `${id}_${sizeTag}`,
      filename: `${id}_${sizeTag}.jpeg}`,
      root: ProductPicturesCollection,
    });

    streamifier.createReadStream(file.buffer)
      .pipe(sharp()
        .resize(size, Math.round(size * 0.75))
        .background({ r: 255, g: 255, b: 255, alpha: 1 })
        .flatten()
        .embed()
        .jpeg()
      )
      .pipe(writestream);

    writestream.on('close', () => resolve());
    writestream.on('error', error => reject(error));
  });
}

function removeFile(id) {
  return Promise.all([
    new Promise((resolve, reject) =>
      mongoHelper.gridfs.remove({
        _id: `${id}_s`,
        root: ProductPicturesCollection,
      }, err => (err ? reject(err) : resolve()))),
    new Promise((resolve, reject) =>
      mongoHelper.gridfs.remove({
        _id: `${id}_m`,
        root: ProductPicturesCollection,
      }, err => (err ? reject(err) : resolve()))),
    new Promise((resolve, reject) =>
      mongoHelper.gridfs.remove({
        _id: `${id}_l`,
        root: ProductPicturesCollection,
      }, err => (err ? reject(err) : resolve()))),
  ]);
}

module.exports = {
  registerEndpoints(app) {
    app.post('/api/products/pictures', authorization, isAdmin, multer.any(),
      (req, res) =>
        Promise.all(req.files.map((file) => {
          const id = shortId.generate();

          return Promise.all([
            saveFileInSize(id, file, 's', 450),
            saveFileInSize(id, file, 'm', 800),
            saveFileInSize(id, file, 'l', 1600),
          ])
            .then(() => id);
        }))
          .then(files => res.status(200).send(JSON.stringify(files)))
          .catch(error => handleGenericError(error, res))
    );

    app.delete('/api/products/pictures/:id', authorization, isAdmin,
      (req, res) =>
        removeFile(req.params.id)
          .then(() => Product.update({}, { $pull: { files: req.params.id } }, { multi: true }))
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res))
    );

    app.get('/api/completeProducts', authorization, isAdmin,
      (req, res) =>
        Product.find().sort({ 'de.name': 1 })
          .then(products => res.send(products))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching products failed!');
          })
    );

    app.put('/api/products', authorization, isAdmin, bodyParser.json(),
      (req, res) =>
        saveOrUpdate(Product, req.body)
          .then(() => res.sendStatus(200))
          .catch(handleGenericError)
    );

    app.get('/api/suppliers', authorization, isAdmin,
      (req, res) =>
        Supplier.find().sort({ name: 1 })
          .then(suppliers => res.send(suppliers))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching suppliers failed!');
          })
    );

    app.get('/api/producers', authorization, isAdmin,
      (req, res) =>
        Producer.find().sort({ name: 1 })
          .then(producers => res.send(producers))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching producers failed!');
          })
    );

    app.put('/api/tags', authorization, isAdmin, bodyParser.json(),
      (req, res) =>
        saveOrUpdate(Tag, req.body)
          .then(() => res.sendStatus(200))
          .catch(handleGenericError)
    );

    app.put('/api/productcategories', authorization, isAdmin, bodyParser.json(),
      ({ body }, res) => {
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
      (req, res) =>
        saveOrUpdate(Supplier, req.body)
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res))
    );

    app.put('/api/producers', authorization, isAdmin, bodyParser.json(),
      (req, res) =>
        saveOrUpdate(Producer, req.body)
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res))
    );

    app.put('/api/orders', authorization, bodyParser.json(),
      (req, res) =>
        saveOrUpdate(Order, Object.assign(
          req.body,
          {
            user: req.user.sub,
            state: OrderState.STARTED,
            date: Date.now(),
          }
        ))
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
              amount: order.items.reduce(
                (sum, { amount, product }) => sum + (amount * product.price * 100), 0
              ),
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

    app.post('/api/payment/prepayment', bodyParser.json(), authorization,
      (req, res) =>
        Order.findOneAndUpdate({
          _id: req.body.shoppingCartId,
          user: req.user.sub,
        }, {
          $set: {
            state: OrderState.WAITING,
          },
        },
        { new: true })
          .then((order) => {
            const { address, items } = order;
            updateProductStocks(items);

            new Invoice({
              user: req.user.sub,
              value: items.reduce(
                (sum, { amount, product }) => sum + (amount * product.price),
                0
              ),
              address,
            }).save()
              .then(invoice =>
                esrGenerator.generate(
                  invoice.invoiceNumber,
                  order._id,
                  invoice.value,
                  invoice.address,
                ).then(pdfPath =>
                  mail.sendESR(order, req.user.email, pdfPath).then(fs.unlink(pdfPath)),
                ),
              );
          })
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res)),
    );
  },
};
