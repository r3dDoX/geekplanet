const router = require('express').Router();
const { authorization, isAdmin } = require('./auth');
const bodyParser = require('body-parser');
const Logger = require('../logger');
const { saveOrUpdate, handleGenericError } = require('../db/mongoHelper');

const {
  Producer,
} = require('../db/models');

router.get('/public',
  (req, res) =>
    Producer.find({}, { _id: 1, name: 1 }).sort({ name: 1 })
      .then(producers => res.send(producers))
      .catch((err) => {
        Logger.error(err);
        res.status(500).send('Fetching producers failed!');
      })
);

router.get('/', authorization, isAdmin,
  (req, res) =>
    Producer.find().sort({ name: 1 })
      .then(producers => res.send(producers))
      .catch((err) => {
        Logger.error(err);
        res.status(500).send('Fetching producers failed!');
      })
);

router.put('/', authorization, isAdmin, bodyParser.json(),
  (req, res) =>
    saveOrUpdate(Producer, req.body)
      .then(() => res.sendStatus(200))
      .catch(error => handleGenericError(error, res))
);

module.exports = router;
