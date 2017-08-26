const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = {
  authorization: jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksUri: 'https://geekplanet.eu.auth0.com/.well-known/jwks.json',
    }),
    algorithms: ['RS256'],
  }),

  isAdmin(req, res, next) {
    if (!req.user || req.user['https://geekplanet.ch/roles'].indexOf('admin') === -1) {
      res.sendStatus(403);
    } else {
      next();
    }
  },
};
