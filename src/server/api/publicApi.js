/* @flow */

const Logger = require('../logger');
const mongoHelper = require('../db/mongoHelper');

const {
  ProductPicturesCollection,
  Producer,
  Product,
  ProductCategory,
  Supplier,
  Tag,
} = require('../db/models');

module.exports = {
  registerEndpoints(app /* : express$Application */) {
    app.get('/api/products/pictures/:id',
      (req /* : express$Request */, res /* : express$Response */) => {
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
      (req /* : express$Request */, res /* : express$Response */) =>
        ProductCategory.find().sort({ name: 1 })
          .then(categories => res.send(categories))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching product categories failed!');
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

    app.get('/api/products',
      (req /* : express$Request */, res /* : express$Response */) =>
        Product.find({}, productListFilter).sort({ name: 1 })
          .then(products => res.send(products))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching products failed!');
          })
    );

    app.get('/api/products/spotlight',
      (req /* : express$Request */, res /* : express$Response */) =>
        Product.find({}, productListFilter).skip(Math.random() * 400).limit(20)
          .then(products => res.send(products))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching products failed!');
          })
    );

    app.get('/api/products/:id',
      (req /* : express$Request */, res /* : express$Response */) =>
        Product.findOne({ _id: req.params.id }, productFilter)
          .then(products => res.send(products))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching products failed!');
          })
    );

    app.get('/api/suppliers',
      (req /* : express$Request */, res /* : express$Response */) =>
        Supplier.find().sort({ name: 1 })
          .then(suppliers => res.send(suppliers))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching suppliers failed!');
          })
    );

    app.get('/api/producers',
      (req /* : express$Request */, res /* : express$Response */) =>
        Producer.find().sort({ name: 1 })
          .then(producers => res.send(producers))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching producers failed!');
          })
    );

    app.get('/api/tags',
      (req /* : express$Request */, res /* : express$Response */) =>
        Tag.find().sort({ name: 1 })
          .then(tags => res.send(tags))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching tags failed!');
          })
    );
  },
};
