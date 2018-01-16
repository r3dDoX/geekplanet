const orderApi = require('./orderApi');
const producerApi = require('./producerApi');
const productApi = require('./productApi');
const supplierApi = require('./supplierApi');
const tagApi = require('./tagApi');
const homeApi = require('./homeApi');
const errorApi = require('./errorApi');
const couponApi = require('./couponApi');

module.exports = {
  registerEndpoints(app) {
    orderApi.registerEndpoints(app);
    producerApi.registerEndpoints(app);
    productApi.registerEndpoints(app);
    supplierApi.registerEndpoints(app);
    tagApi.registerEndpoints(app);
    homeApi.registerEndpoints(app);
    errorApi.registerEndpoints(app);
    couponApi.registerEndpoints(app);
  },
};
