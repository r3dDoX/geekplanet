/* @flow */

const Logger = require('./logger');

const {
  ProductPictures,
  Producer,
  Product,
  ProductCategory,
  Supplier,
  Tag,
} = require('./models');

module.exports = {
  registerEndpoints(app /* : express$Application */) {
    app.get('/api/products/pictures/:id',
      (req /* : express$Request */, res /* : express$Response */) => {
        res.header({
          'Cache-Control': 'public, max-age=31556926',
        });
        ProductPictures.readById(req.params.id).pipe(res);
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

    app.get('/api/products',
      (req /* : express$Request */, res /* : express$Response */) =>
        Product.find().sort({ name: 1 })
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
