const { authorization, isAdmin } = require('./auth');
const { handleGenericError } = require('../db/mongoHelper');
const cc = require('coupon-code');

const {
  Coupon,
} = require('../db/models');

module.exports = {
  registerEndpoints(app) {
    app.get('/api/coupons', authorization, isAdmin,
      (req, res) => Coupon.find().then(coupons => res.send(coupons))
    );

    app.post('/api/coupons/', authorization, isAdmin,
      (req, res) =>
        new Coupon()
          .save()
          .then(coupon => res.send(coupon))
          .catch(handleGenericError)
    );

    app.put('/api/coupons/:couponId/redeem/:orderId', authorization, (req, res) =>
      Coupon.update(
        { _id: req.params.couponId, usedWithOrder: { $exists: false } },
        { usedWithOrder: req.params.orderId }
      )
        .then(() => res.sendStatus(200))
        .catch(handleGenericError)
    );

    app.get('/api/coupons/:id/validate', (req, res) => {
      if (!cc.validate(req.params.id, { parts: 4 })) {
        res.sendStatus(404);
        return;
      }

      Coupon.findOne({ _id: req.params.id, usedWithOrder: { $exists: false } })
        .then((coupon) => {
          if (!coupon) {
            res.sendStatus(404);
          } else {
            res.sendStatus(200);
          }
        })
        .catch(handleGenericError);
    });
  },
};
