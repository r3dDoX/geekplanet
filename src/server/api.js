/* @flow */

const shortId = require('shortid');
const multer = require('multer')();
const streamifier = require('streamifier');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');
const cloudFoundryConfig = require('./cloudfoundry.config');
const mongoURI = process.env.MONGODB_URI || cloudFoundryConfig.getMongoDbUri();
mongoose.Promise = Promise;
mongoose.connect(mongoURI);

const gridfs = require('mongoose-gridfs')({
  collection: 'productpictures',
  model: 'ProductPictures'
});

const ProductPictures = gridfs.model;

const AddressSchema = mongoose.Schema({
  streetName: String,
  streetNumber: String,
  zip: Number,
  city: String
});

const Product = mongoose.model('Product', {
  name: String,
  price: Number,
  stock: Number,
  files: [String]
});

const Producer = mongoose.model('Producer', {
  name: String,
  address: AddressSchema
});

const Supplier = mongoose.model('Supplier', {
  name: String,
  contact: String,
  paymentTerms: String,
  address: AddressSchema
});

const parseAddress = ({streetName, houseNumber, zip, city}) => ({
  streetName,
  houseNumber,
  zip,
  city
});

module.exports = {
  registerEndpoints(app) {
    app.use(mongoSanitize());

    app.get('/api/products/pictures/:id', (req, res) => ProductPictures.readById(req.params.id).pipe(res));

    app.post('/api/products', multer.any(), (req, res) => {
      Promise.all(req.files.map(file => {
        return new Promise((resolve, reject) => {
          ProductPictures.write({
              filename: `${shortId.generate()}.${file.originalname.split(/[. ]+/).pop()}`,
              contentType: file.mimetype
            },
            streamifier.createReadStream(file.buffer),
            (error, file) => {
              if (error) {
                reject(error);
              } else {
                resolve(file._id);
              }
            });
        });
      }))
        .then((files) => new Product(Object.assign(req.body, {files})).save().then(() => res.sendStatus(200)))
        .catch(err => {
          console.error(err);
          res.status(500).send('Failed to save product and/or pictures!');
        });
    });

    app.post('/api/suppliers', multer.none(), (req, res) => {
      const supplier = req.body;
      supplier.address = parseAddress(supplier);

      new Supplier(supplier).save()
        .then(() => res.sendStatus(200))
        .catch((error) => res.send(error));
    });

    app.post('/api/producers', multer.none(), (req, res) => {
      const producer = req.body;
      producer.address = parseAddress(producer);

      new Producer(producer).save()
        .then(() => res.sendStatus(200))
        .catch((error) => res.send(error));
    });
  }
};