/* @flow */

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cloudFoundryConfig = require('./cloudfoundry.config');
const mongoURI = process.env.MONGODB_URI || cloudFoundryConfig.getMongoDbUri();
mongoose.Promise = Promise;
mongoose.connect(mongoURI);

const AddressSchema = mongoose.Schema({
  streetName: String,
  streetNumber: String,
  zip: Number,
  city: String
});

const Product = mongoose.model('Product', {
  name: String,
  price: Number,
  stock: Number
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
    app.use(bodyParser.json());

    app.post('/api/products', (req, res) => {
      new Product(req.body).save()
        .then(() => res.sendStatus(200))
        .catch((error) => res.send(error));
    });

    app.post('/api/suppliers', (req, res) => {
      const supplier = req.body;
      supplier.address = parseAddress(supplier);

      new Supplier(supplier).save()
        .then(() => res.sendStatus(200))
        .catch((error) => res.send(error));
    });

    app.post('/api/producers', (req, res) => {
      const producer = req.body;
      producer.address = parseAddress(producer);

      new Producer(producer).save()
        .then(() => res.sendStatus(200))
        .catch((error) => res.send(error));
    });
  }
};