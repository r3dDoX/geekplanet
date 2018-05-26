const router = require('express').Router();
const { authorization, isAdmin } = require('./auth');
const bodyParser = require('body-parser');
const { saveOrUpdate } = require('../db/mongoHelper');
const asyncHandler = require('express-async-handler');

const {
  HomeTile,
} = require('../db/models');

router.get('/tiles',
  asyncHandler(async (req, res) => {
    const tiles = await HomeTile.find().sort({ order: 1 });
    res.send(tiles);
  }));

router.put('/tiles', authorization, isAdmin, bodyParser.json(),
  asyncHandler(async (req, res) => {
    const count = await HomeTile.count();
    const tile = req.body;
    tile.order = count;

    await saveOrUpdate(HomeTile, tile);
    res.sendStatus(200);
  }));

router.post('/tiles/order', authorization, isAdmin, bodyParser.json(),
  asyncHandler(async ({ body }, res) => {
    const [{ _id, order: originalPosition }, siblingTile] = await Promise.all([
      HomeTile.findOne({ _id: body.element }),
      body.sibling ? HomeTile.findOne({ _id: body.sibling }) : HomeTile.count(),
    ]);

    let positionToTake = (typeof siblingTile === 'number') ? siblingTile : siblingTile.order;
    if (originalPosition < positionToTake) {
      positionToTake -= 1;
      await HomeTile.updateMany(
        { order: { $gt: originalPosition, $lte: positionToTake } },
        { $inc: { order: -1 } }
      );
    } else {
      await HomeTile.updateMany(
        { order: { $gte: positionToTake, $lt: originalPosition } },
        { $inc: { order: 1 } }
      );
    }

    await HomeTile.update(
      { _id },
      { $set: { order: positionToTake } }
    );

    res.sendStatus(200);
  }));

module.exports = router;
