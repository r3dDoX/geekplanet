const router = require('express').Router();
const { authorization, isAdmin } = require('./auth');
const bodyParser = require('body-parser');
const { saveOrUpdate } = require('../db/mongoHelper');
const asyncHandler = require('express-async-handler');

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
