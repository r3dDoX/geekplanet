const router = require('express').Router();
const { authorization, isAdmin } = require('./auth');
const bodyParser = require('body-parser');
const Logger = require('../logger');
const { saveOrUpdate, handleGenericError } = require('../db/mongoHelper');

const {
  HomeTile,
} = require('../db/models');

router.get('/tiles',
  (req, res) =>
    HomeTile.find().sort({ order: 1 })
      .then(tiles => res.send(tiles))
      .catch((err) => {
        Logger.error(err);
        res.status(500).send('Fetching home tiles failed!');
      })
);

router.put('/tiles', authorization, isAdmin, bodyParser.json(),
  (req, res) =>
    HomeTile.count().then((count) => {
      const tile = req.body;
      tile.order = count;

      saveOrUpdate(HomeTile, tile)
        .then(() => res.sendStatus(200))
        .catch(error => handleGenericError(error, res));
    })
);

router.post('/tiles/order', authorization, isAdmin, bodyParser.json(),
  ({ body }, res) => Promise.all([
    HomeTile.findOne({ _id: body.element }),
    body.sibling ? HomeTile.findOne({ _id: body.sibling }) : HomeTile.count(),
  ])
    .then(([{ _id, order: originalPosition }, siblingTile]) => {
      let promise;
      let positionToTake = (typeof siblingTile === 'number') ? siblingTile : siblingTile.order;

      if (originalPosition < positionToTake) {
        positionToTake -= 1;
        promise = HomeTile.updateMany(
          { order: { $gt: originalPosition, $lte: positionToTake } },
          { $inc: { order: -1 } }
        );
      } else {
        promise = HomeTile.updateMany(
          { order: { $gte: positionToTake, $lt: originalPosition } },
          { $inc: { order: 1 } }
        );
      }

      return promise.then(() => HomeTile.update(
        { _id },
        { $set: { order: positionToTake } })
      );
    })
    .then(() => res.sendStatus(200), error => handleGenericError(error, res))
);

module.exports = router;
