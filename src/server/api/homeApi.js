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

    app.post('/api/hometiles/order', authorization, isAdmin, bodyParser.json(),
      ({ body }, res) => Promise.all([
        HomeTile.findOne({ _id: body.element }),
        body.sibling ? HomeTile.findOne({ _id: body.sibling }) : HomeTile.count(),
      ])
        .then(([tile, siblingTile]) => {
          let promise;
          const originalPosition = tile.order;
          let positionToTake = (typeof siblingTile === 'number') ?
            siblingTile - 1 : siblingTile.order;


          if (originalPosition < positionToTake) {
            positionToTake -= 1;
            promise = HomeTile.updateMany({
              order: {
                $gt: originalPosition,
                $lte: positionToTake,
              },
            }, {
              $inc: {
                order: -1,
              },
            });
          } else {
            promise = HomeTile.updateMany({
              order: {
                $gte: positionToTake,
                $lt: originalPosition,
              },
            }, {
              $inc: {
                order: 1,
              },
            });
          }

          return promise.then(() =>
            HomeTile.update({
              _id: body.element,
            }, {
              $set: { order: positionToTake },
            }));
        })
        .then(() => res.sendStatus(200), () => res.sendStatus(500))
    );
  },
};
