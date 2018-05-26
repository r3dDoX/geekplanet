const router = require('express').Router();
const { authorization, isAdmin } = require('./auth');
const bodyParser = require('body-parser');
const { saveOrUpdate } = require('../db/mongoHelper');
const asyncHandler = require('express-async-handler');

const {
  Tag,
} = require('../db/models');

router.get('/',
  asyncHandler(async (req, res) => {
    const tags = await Tag.find().sort({ name: 1 });
    res.send(tags);
  }));

router.put('/', authorization, isAdmin, bodyParser.json(),
  asyncHandler(async (req, res) => {
    await saveOrUpdate(Tag, req.body);
    res.sendStatus(200);
  }));

module.exports = router;
