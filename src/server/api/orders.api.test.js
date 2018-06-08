const mockingoose = require('mockingoose').default;
const mongoose = require('mongoose');
const ordersRouter = require('./orders.api');
const httpMocks = require('node-mocks-http');

describe('orders api', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('get all orders', () => {
    it('should prevent user from fetching', () => {
      const mockResponse = httpMocks.createResponse();
      const mockRequest = httpMocks.createRequest({
        url: '/',
        method: 'GET',
        user: {
          'https://geekplanet.ch/roles': ['user'],
        },
      });

      ordersRouter.handle(mockRequest, mockResponse);

      expect(mockResponse.statusCode).toEqual(403);
    });

    it('should log all given params', (done) => {
      const objectId = mongoose.Types.ObjectId();
      const mockResponse = httpMocks.createResponse();
      const mockRequest = httpMocks.createRequest({
        url: '/',
        method: 'GET',
        user: {
          'https://geekplanet.ch/roles': ['admin'],
        },
      });
      mockingoose.Order.toReturn([
        {
          _id: 'testId1',
          date: new Date('2018-06-05T14:49'),
          invoice: objectId,
        },
      ], 'find');
      mockingoose.Invoice.toReturn({
        _id: objectId,
        esr: 'esrNumber',
      }, 'findOne');

      ordersRouter.handle(mockRequest, mockResponse, () => {
        expect(mockResponse.statusCode).toEqual(200);
        expect(mockResponse._getData()[0]._id).toEqual('testId1');
        expect(mockResponse._getData()[0].esr).toEqual('esrNumber');
        done();
      });
    });
  });
});
