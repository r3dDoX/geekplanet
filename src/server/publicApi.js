/* @flow */

const bodyParser = require('body-parser');

const {
  ProductPictures,
  Producer,
  Product,
  ProductCategory,
  Supplier,
} = require('./models');

module.exports = {
  registerEndpoints(app) {
    app.get('/api/products/pictures/:id', (req, res) => {
      res.header({
        'Cache-Control': 'public, max-age=31556926',
      });
      ProductPictures.readById(req.params.id).pipe(res);
    });

    app.get('/api/productcategories', (req, res) => ProductCategory.find({})
      .then(categories => res.send(categories))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Fetching product categories failed!');
      })
    );

    app.get('/api/products', (req, res) => Product.find({})
      .then(products => res.send(products))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Fetching products failed!');
      })
    );

    app.get('/api/suppliers', (req, res) => Supplier.find({})
      .then(suppliers => res.send(suppliers))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Fetching suppliers failed!');
      })
    );

    app.get('/api/producers', (req, res) => Producer.find({})
      .then(producers => res.send(producers))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Fetching producers failed!');
      })
    );
  },
};
