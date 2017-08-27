const { authorization, isAdmin } = require('./auth');
const bodyParser = require('body-parser');
const Logger = require('../logger');
const { saveOrUpdate, handleGenericError } = require('../db/mongoHelper');

const {
  Supplier,
} = require('../db/models');

module.exports = {
  registerEndpoints(app) {
    app.get('/api/suppliers', authorization, isAdmin,
      (req, res) =>
        Supplier.find().sort({ name: 1 })
          .then(suppliers => res.send(suppliers))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching suppliers failed!');
          })
    );

    app.put('/api/suppliers', authorization, isAdmin, bodyParser.json(),
      (req, res) =>
        saveOrUpdate(Supplier, req.body)
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res))
    );
  },
};
