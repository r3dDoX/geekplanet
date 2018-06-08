const errorRouter = require('./error.api');
const httpMocks = require('node-mocks-http');
const Logger = require('../logger');
const { handleRoute } = require('../../test/test.helpers');

describe('error api', () => {
  describe('log', () => {
    it('should log all given params', async () => {
      Logger.error = jest.fn();

      const mockRequest = httpMocks.createRequest({
        url: '/log',
        method: 'POST',
        body: {
          message: 'testMessage',
          url: 'testUrl',
          lineNo: 1,
          colNo: 2,
        },
      });

      await handleRoute(errorRouter, mockRequest, {});

      expect(Logger.error.mock.calls).toHaveLength(1);
      const logParams = Logger.error.mock.calls[0][0];
      expect(logParams).toContain('testMessage');
      expect(logParams).toContain('testUrl');
      expect(logParams).toContain('Row: 1');
      expect(logParams).toContain('Col: 2');
    });

    it('should log stack if given', async () => {
      Logger.error = jest.fn();

      const mockRequest = httpMocks.createRequest({
        url: '/log',
        method: 'POST',
        body: {
          error: {
            stack: 'errorStack',
          },
        },
      });

      await handleRoute(errorRouter, mockRequest, {});

      expect(Logger.error.mock.calls).toHaveLength(2);
      expect(Logger.error.mock.calls[1][0]).toContain('errorStack');
    });
  });
});
