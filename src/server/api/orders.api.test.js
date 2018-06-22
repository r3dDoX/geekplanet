const mockingoose = require('mockingoose').default;
const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const events = require('events');
const ordersRouter = require('./orders.api');

function createMockResponse() {
  return httpMocks.createResponse({
    eventEmitter: events.EventEmitter,
  });
}

describe('orders api', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('get all orders', () => {
    it('should prevent unauthorized user from fetching', () => {
      const mockResponse = httpMocks.createResponse();
      const mockRequest = httpMocks.createRequest({
        url: '/',
        method: 'GET',
      });

      ordersRouter.handle(mockRequest, mockResponse);

      expect(mockResponse.statusCode).toEqual(403);
    });

    it('should log all given params', (done) => {
      const objectId = mongoose.Types.ObjectId();
      const mockResponse = createMockResponse();
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

  describe('userAdresses', () => {
    it('should return created address id', (done) => {
      const objectId = mongoose.Types.ObjectId();
      const mockResponse = createMockResponse();
      const mockRequest = httpMocks.createRequest({
        url: '/userAddress',
        method: 'PUT',
        user: {
          sub: 'userId',
        },
        body: {
          title: 'title',
          firstName: 'firstName',
          lastName: 'lastName',
          streetAddress: 'streetAddress',
          zip: 5000,
          city: 'city',
          country: 'country',
        },
      });
      mockingoose.UserAddress.toReturn({
        _id: objectId,
      }, 'save');

      ordersRouter.handle(mockRequest, mockResponse);

      mockResponse.on('end', () => {
        expect(mockResponse.statusCode).toEqual(200);
        expect(mockResponse._getData()).toEqual(objectId);
        done();
      });
    });
  });
});
