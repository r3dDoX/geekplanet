const bodyParser = require('body-parser');
const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { authorization, isAdmin } = require('./auth');
const { saveOrUpdate } = require('../db/mongoHelper');

const {
  Producer,
} = require('../db/models');

router.get('/public',
  asyncHandler(async (req, res) => {
    const producers = await Producer.find({}, { _id: 1, name: 1 }).sort({ name: 1 });
    res.send(producers);
  }));

router.get('/', authorization, isAdmin,
  asyncHandler(async (req, res) => {
    const producers = await Producer.find().sort({ name: 1 });
    res.send(producers);
  }));

router.put('/', authorization, isAdmin, bodyParser.json(),
  asyncHandler(async (req, res) => {
    await saveOrUpdate(Producer, req.body);
    res.sendStatus(200);
  }));

module.exports = router;
