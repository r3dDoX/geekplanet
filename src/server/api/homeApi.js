const { authorization, isAdmin } = require('./auth');
const bodyParser = require('body-parser');
const Logger = require('../logger');
const { saveOrUpdate, handleGenericError } = require('../db/mongoHelper');

const {
  HomeTile,
} = require('../db/models');

module.exports = {
  registerEndpoints(app) {
    app.get('/api/hometiles',
      (req, res) =>
        HomeTile.find().sort({ order: 1 })
          .then(tiles => res.send(tiles))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching home tiles failed!');
          })
    );

    app.put('/api/hometiles', authorization, isAdmin, bodyParser.json(),
      (req, res) =>
        saveOrUpdate(HomeTile, req.body)
          .then(() => res.sendStatus(200))
          .catch(error => handleGenericError(error, res))
    );
  },
};
