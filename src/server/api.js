/* @flow */

const jwt = require('express-jwt');
const shortId = require('shortid');
const bodyParser = require('body-parser');
const multer = require('multer')();
const streamifier = require('streamifier');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');
const cloudFoundryConfig = require('./cloudfoundry.config.js');
const secretConfig = require('../config/secret.config.json');

const mongoURI = process.env.MONGODB_URI || cloudFoundryConfig.getMongoDbUri();
mongoose.Promise = Promise;
mongoose.connect(mongoURI);

const gridfs = require('mongoose-gridfs')({
  collection: 'productpictures',
  model: 'ProductPictures',
});

const ProductPictures = gridfs.model;

const AddressSchema = mongoose.Schema({
  streetName: String,
  streetNumber: String,
  zip: Number,
  city: String,
});

const ProductCategory = mongoose.model('ProductCategory', {
  name: String,
});

const Product = mongoose.model('Product', {
  name: String,
  category: String,
  shortDescription: String,
  description: String,
  price: Number,
  purchasePrice: Number,
  purchasePackageSize: Number,
  stock: Number,
  minStock: Number,
  supplier: mongoose.Schema.Types.ObjectId,
  supplierProductCode: String,
  producer: mongoose.Schema.Types.ObjectId,
  remarks: String,
  files: [String],
});

const Producer = mongoose.model('Producer', {
  name: String,
  vatNumber: String,
  address: AddressSchema,
  contactName: String,
  contactEmail: String,
  contactPhone: String,
  remarks: String,
});

const Supplier = mongoose.model('Supplier', {
  name: String,
  vatNumber: String,
  address: AddressSchema,
  contactName: String,
  contactEmail: String,
  contactPhone: String,
  customerNumber: String,
  remarks: String,
});

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
    app.use(mongoSanitize());

    app.get('/api/products/pictures/:id', (req, res) => {
      res.header({
        'Cache-Control': 'public, max-age=31557600',
      });
      ProductPictures.readById(req.params.id).pipe(res);
    });

    app.get('/api/productcategories', (req, res) => ProductCategory.find({})
      .then(categories => res.send(categories.map(category => category.name)))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Fetching product categories failed!');
      })
    );

    app.post('/api/productcategories', multer.none(), authorization, isAdmin, (req, res) => {
      new ProductCategory(req.body).save()
        .then(() => res.sendStatus(200))
        .catch(error => res.send(error));
    });

    app.get('/api/products', (req, res) => Product.find({})
      .then(products => res.send(products))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Fetching products failed!');
      })
    );

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

    app.get('/api/suppliers', (req, res) => Supplier.find({})
      .then(suppliers => res.send(suppliers))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Fetching suppliers failed!');
      })
    );

    app.post('/api/suppliers', multer.none(), authorization, isAdmin, (req, res) => {
      const supplier = req.body;
      supplier.address = parseAddress(supplier);

      new Supplier(supplier).save()
        .then(() => res.sendStatus(200))
        .catch(error => res.send(error));
    });

    app.get('/api/producers', (req, res) => Producer.find({})
      .then(producers => res.send(producers))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Fetching producers failed!');
      })
    );

    app.post('/api/producers', multer.none(), authorization, isAdmin, (req, res) => {
      const producer = req.body;
      producer.address = parseAddress(producer);

      new Producer(producer).save()
        .then(() => res.sendStatus(200))
        .catch(error => res.send(error));
    });

    app.post('/api/payment/:state', bodyParser.urlencoded(), (req, res) => {
      console.log(req.params.state);
      console.log(req.body);
      res.redirect('/order');
    });
  },
};
