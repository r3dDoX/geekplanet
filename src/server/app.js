require('babel-core/register')({
  presets: ['react'],
});

const path = require('path');
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const mime = require('mime-types');
const Logger = require('./logger');
const mongo = require('./db/mongoHelper');
const config = require('../config/envConfig').getEnvironmentSpecificConfig();
const api = require('./api');

mongo.init();
const app = express();
app.enable('etag');
app.use('*', (req, res, next) => {
  if (config.USE_SSL && req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(`https://${req.hostname}${req.url}`);
  } else {
    next();
  }
});
app.use(mongoSanitize());

if (process.env.NODE_ENV === 'production') {
  app.get('*.js', (req, res, next) => {
    // TODO: this is a fix because of issue: https://github.com/webpack-contrib/compression-webpack-plugin/issues/30
    if (!req.url.includes('manifest')) {
      req.url += '.gz';
      res.set('Content-Encoding', 'gzip');
    }
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

