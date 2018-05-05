const config = require('../config/envConfig').getEnvironmentSpecificConfig();

if (config.NEWRELIC) {
  require('newrelic'); // eslint-disable-line global-require
}

const path = require('path');
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const mime = require('mime-types');
const Logger = require('./logger');
const mongo = require('./db/mongoHelper');
const api = require('./api');

mongo.init();
const app = express();
app.use(mongoSanitize());
app.use('*', (req, res, next) => {
  if (config.USE_SSL && req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(`https://${req.hostname}${req.url}`);
  } else {
    next();
  }
});

app.enable('etag');
// prevent IE from caching REST requests to /api
app.use('/api', (req, res, next) => {
  res.setHeader('Expires', -1);
  res.setHeader('Cache-Control', 'public, must-revalidate');
  next();
});


if (process.env.NODE_ENV === 'production') {
  app.get('*.js', (req, res, next) => {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/javascript');
    next();
  });
}

app.use('/', express.static('dist/', {
  maxAge: '1y',
  setHeaders(res, headerPath) {
    if (mime.lookup(headerPath) === 'text/html') {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
    } else if (mime.lookup(headerPath) === 'application/json') {
      res.setHeader('Cache-Control', 'public, must-revalidate');
    }
  },
}));

api.registerEndpoints(app);

app.get('/*', (req /* : express$Request */, res /* : express$Response */) =>
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
);

const server = app.listen(process.env.PORT || 3000, () => {
  Logger.info(`Listening on port ${server.address().port}`);
});

