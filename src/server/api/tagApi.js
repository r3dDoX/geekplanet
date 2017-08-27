const { authorization, isAdmin } = require('./auth');
const bodyParser = require('body-parser');
const Logger = require('../logger');
const { saveOrUpdate, handleGenericError } = require('../db/mongoHelper');

const {
  Tag,
} = require('../db/models');

module.exports = {
  registerEndpoints(app) {
    app.get('/api/tags',
      (req, res) =>
        Tag.find().sort({ name: 1 })
          .then(tags => res.send(tags))
          .catch((err) => {
            Logger.error(err);
            res.status(500).send('Fetching tags failed!');
          })
    );

    app.put('/api/tags', authorization, isAdmin, bodyParser.json(),
      (req, res) =>
        saveOrUpdate(Tag, req.body)
          .then(() => res.sendStatus(200))
          .catch(handleGenericError)
    );
  },
};
