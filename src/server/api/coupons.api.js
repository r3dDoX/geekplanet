const router = require('express').Router();
const compression = require('compression');
const cc = require('coupon-code');
const asyncHandler = require('express-async-handler');
const { authorization, isAdmin } = require('./auth');

const {
  Coupon,
} = require('../db/models');

router.get('/', authorization, isAdmin, compression(),
  asyncHandler(async (req, res) => {
    const coupons = await Coupon
      .find({ amount: { $gt: 0 } })
      .sort({ date: -1 });

    res.send(coupons);
  }));

router.post('/:amount', authorization, isAdmin,
  asyncHandler(async (req, res) => {
    const coupon = await new Coupon({
      _id: cc.generate({ parts: 4 }),
      amount: req.params.amount,
      date: Date.now(),
    }).save();

    res.send(coupon);
  }));

router.get('/:id', asyncHandler(async (req, res) => {
  if (!cc.validate(req.params.id, { parts: 4 })) {
    res.sendStatus(404);
    return;
  }

  const coupon = await Coupon.findOne({ _id: req.params.id, amount: { $gt: 0 } });

  if (!coupon) {
    res.sendStatus(404);
  } else {
    res.send(coupon);
  }
}));

module.exports = router;
