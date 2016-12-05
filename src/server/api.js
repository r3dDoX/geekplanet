/* @flow */

const shortId = require('shortid');
const multer = require('multer')();
const streamifier = require('streamifier');
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
    app.get('/api/products/pictures/:id', (req, res) => {
      const pictureStream = ProductPictures.readById(req.params.id);
      // TODO: stream picture to client
      res.sendStatus(200);
    });

    app.post('/api/products', multer.any(), (req, res) => {
      const product = req.body;
      product.files = [];

      req.files.forEach((file) => {
        const id = shortId.generate();
        const filename = `${id}.${file.originalname.split(/[. ]+/).pop()}`;
        product.files.push(id);

        ProductPictures.write({
            _id: id,
            filename,
            contentType: file.mimetype
          },
          streamifier.createReadStream(file.buffer),
          error => {
            if (error) console.error(error);
          });
      });

      new Product(product).save()
       .then(() => res.sendStatus(200))
       .catch((error) => res.send(error));
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