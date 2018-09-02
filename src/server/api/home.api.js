const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const router = require('express').Router();
const { authorization, isAdmin } = require('./auth');

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
    // TODO implement creation
    res.sendStatus(200);
  }));

router.post('/tiles/order', authorization, isAdmin, bodyParser.json(),
  asyncHandler(async (req, res) => {
    // TODO implement ordering
    res.sendStatus(200);
  }));

module.exports = router;
