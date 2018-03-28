const { authorization, isAdmin } = require('./auth');
const { handleGenericError } = require('../db/mongoHelper');
const cc = require('coupon-code');

const {
  Coupon,
} = require('../db/models');

module.exports = {
  registerEndpoints(app) {
    app.get('/api/coupons', authorization, isAdmin,
      (req, res) => Coupon
        .find({ amount: { $gt: 0 } })
        .sort({ date: -1 })
        .then(coupons => res.send(coupons))
    );

    app.post('/api/coupons/:amount', authorization, isAdmin,
      (req, res) =>
        new Coupon({
          _id: cc.generate({ parts: 4 }),
          amount: req.params.amount,
        })
          .save()
          .then(coupon => res.send(coupon))
          .catch(handleGenericError)
    );

    app.get('/api/coupons/:id', (req, res) => {
      if (!cc.validate(req.params.id, { parts: 4 })) {
        res.sendStatus(404);
        return;
      }

      Coupon
        .findOne({ _id: req.params.id, amount: { $gt: 0 } })
        .then((coupon) => {
          if (!coupon) {
            res.sendStatus(404);
          } else {
            res.send(coupon);
          }
        })
        .catch(handleGenericError);
    });
  },
};
