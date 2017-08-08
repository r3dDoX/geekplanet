require('babel-core/register')({
  presets: ['react'],
});

const path = require('path');
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const Logger = require('./logger');
const mongo = require('./db/mongoHelper');

mongo.init();
const app = express();
app.use('*', (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
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

const server = app.listen(process.env.PORT || 3000, () => {
  Logger.info(`Listening on port ${server.address().port}`);
});

app.use('/', express.static('dist/', {
  maxAge: '1y',
}));

require('./api/authorizedApi').registerEndpoints(app);
require('./api/publicApi').registerEndpoints(app);

app.get('/*', (req /* : express$Request */, res /* : express$Response */) =>
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
);
