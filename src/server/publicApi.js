/* @flow */

const {
  ProductPictures,
  Producer,
  Product,
  ProductCategory,
  Supplier,
  Tag,
} = require('./models');

module.exports = {
  registerEndpoints(app) {
    app.get('/api/products/pictures/:id', (req, res) => {
      res.header({
        'Cache-Control': 'public, max-age=31556926',
      });
      ProductPictures.readById(req.params.id).pipe(res);
    });

    app.get('/api/productcategories', (req, res) => ProductCategory.find().sort({ name: 1 })
      .then(categories => res.send(categories))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Fetching product categories failed!');
      })
    );

    app.get('/api/products', (req, res) => Product.find().sort({ name: 1 })
      .then(products => res.send(products))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Fetching products failed!');
      })
    );

    app.get('/api/suppliers', (req, res) => Supplier.find().sort({ name: 1 })
      .then(suppliers => res.send(suppliers))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Fetching suppliers failed!');
      })
    );

    app.get('/api/producers', (req, res) => Producer.find().sort({ name: 1 })
      .then(producers => res.send(producers))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Fetching producers failed!');
      })
    );

    app.get('/api/tags', (req, res) => Tag.find().sort({ name: 1 })
      .then(tags => res.send(tags))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Fetching tags failed!');
      })
    );
  },
};
