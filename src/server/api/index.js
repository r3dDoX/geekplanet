const router = require('express').Router();

router.use('/orders', require('./orders.api'));
router.use('/producers', require('./producers.api'));
router.use('/products', require('./products.api'));
router.use('/suppliers', require('./suppliers.api'));
router.use('/tags', require('./tags.api'));
router.use('/home', require('./home.api'));
router.use('/error', require('./error.api'));
router.use('/coupons', require('./coupons.api'));

module.exports = router;
