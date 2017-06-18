// @flow

const fs = require('fs');
const jwt = require('express-jwt');
const shortId = require('shortid');
const bodyParser = require('body-parser');
const multer = require('multer')();
const streamifier = require('streamifier');
const sharp = require('sharp');
const Logger = require('../logger');
const secretConfig = require('../../config/secret.config.json');
const stripe = require('stripe')(secretConfig.PAYMENT_SECRET || process.env.PAYMENT_SECRET);
const esrGenerator = require('../esr/esrGenerator');
const mail = require('../mail');
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
  secret: process.env.SECRET || secretConfig.SECRET,
});

function isAdmin(
  req /* : express$Request */,
  res /* : express$Response */,
  next /* : express$NextFunction */
) {
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
        .resize(size, size)
        .background({ r: 255, g: 255, b: 255, alpha: 1 })
        .flatten()
        .max()
        .withoutEnlargement()
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
  registerEndpoints(app /* : express$Application */) {
    app.post('/api/products/pictures', authorization, isAdmin, multer.any(),
      (req /* : express$Request */, res /* : express$Response */) =>
        Promise.all(req.files.map((file) => {
          const id = shortId.generate();

          return Promise.all([
            saveFileInSize(id, file, 's', 400),
            saveFileInSize(id, file, 'm', 800),
            saveFileInSize(id, file, 'l', 1600),
          ])
            .then(() => id);
        }))
          .then(files => res.status(200).send(JSON.stringify(files)))
          .catch(error => handleGenericError(error, res))
    );

    app.delete('/api/products/pictures/:id', authorization, isAdmin,
      (req /* : express$Request */, res /* : express$Response */) =>
        removeFile(req.params.id)
          .then(() => Product.update({}, { $pull: { files: req.params.id } }, { multi: true }))
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res))
    );

    app.get('/api/completeProducts', authorization, isAdmin,
      (req /* : express$Request */, res /* : express$Response */) =>
        Product.find().sort({ 'de.name': 1 })
          .then(products => res.send(products))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching products failed!');
          })
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
            user: req.user.sub,
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
          { user: req.user.sub }
        ))
          .then(address => res.status(200).send(address._id))
          .catch(error => handleGenericError(error, res))
    );

    app.get('/api/userAddresses', authorization,
      (req /* : express$Request */, res /* : express$Response */) =>
        UserAddress.find({ user: req.user.sub }, { user: 0 })
          .then(addresses => res.status(200).send(JSON.stringify(addresses)))
          .catch(error => handleGenericError(error, res))
    );

    app.post('/api/payment/cleared', bodyParser.json(), authorization,
      (req /* : express$Request */, res /* : express$Response */) => {
        const orderQuery = Order.findOne({ _id: req.body.shoppingCartId, user: req.user.sub });

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
          user: req.user.sub,
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
