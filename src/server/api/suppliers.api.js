const bodyParser = require('body-parser');
const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { authorization, isAdmin } = require('./auth');
const { saveOrUpdate } = require('../db/mongoHelper');

const {
  Supplier,
} = require('../db/models');

router.get('/', authorization, isAdmin,
  asyncHandler(async (req, res) => {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.send(suppliers);
  }));

router.put('/', authorization, isAdmin, bodyParser.json(),
  asyncHandler(async (req, res) => {
    await saveOrUpdate(Supplier, req.body);
    res.sendStatus(200);
  }));

module.exports = router;
