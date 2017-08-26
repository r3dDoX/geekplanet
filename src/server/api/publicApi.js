const compression = require('compression');
const Logger = require('../logger');
const mongoHelper = require('../db/mongoHelper');

const {
  ProductPicturesCollection,
  Product,
  Producer,
  ProductCategory,
  Tag,
} = require('../db/models');

module.exports = {
  registerEndpoints(app) {
    app.get('/api/products/pictures/:id',
      (req, res) => {
        res.header({
          'Cache-Control': 'public, max-age=31536000',
        });

        const readStream = mongoHelper.gridfs.createReadStream({
          _id: req.params.id,
          root: ProductPicturesCollection,
        });

        readStream.on('error', (err) => {
          res.sendStatus(404);
          Logger.error(err);
        });

        readStream.pipe(res);
      });

    app.get('/api/productcategories',
      (req, res) =>
        ProductCategory.find().sort({ 'de.name': 1 })
          .then(categories => res.send(categories))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching product categories failed!');
          })
    );

    app.get('/api/publicproducers',
      (req, res) =>
        Producer.find({}, { _id: 1, name: 1 }).sort({ name: 1 })
          .then(producers => res.send(producers))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching producers failed!');
          })
    );

    const productFilter = {
      purchasePrice: 0,
      purchasePackageSize: 0,
      minStock: 0,
      supplier: 0,
      supplierProductCode: 0,
      remarks: 0,
    };

    const productListFilter = Object.assign({}, productFilter, {
      'de.description': 0,
      'en.description': 0,
      'fr.description': 0,
      'it.description': 0,
      files: {
        $slice: 1,
      },
    });

    app.get('/api/products', compression(),
      (req, res) =>
        Product.find({}, productListFilter).sort({ name: 1 })
          .then(products => res.send(products))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching products failed!');
          })
    );

    app.get('/api/products/spotlight',
      (req, res) =>
        Product.find({}, productListFilter).skip(Math.random() * 400).limit(10)
          .then(products => res.send(products))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching products failed!');
          })
    );

    app.get('/api/products/:id',
      (req, res) =>
        Product.findOne({ _id: req.params.id }, productFilter)
          .then(products => res.send(products))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching products failed!');
          })
    );

    app.get('/api/tags',
      (req, res) =>
        Tag.find().sort({ name: 1 })
          .then(tags => res.send(tags))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching tags failed!');
          })
    );
  },
};
