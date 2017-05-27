// @flow

const path = require('path');
const express = require('express');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const Logger = require('./logger');
const mongo = require('./db/mongoHelper');

mongo.init();
const app = express();
app.use('*', (
  req /* : express$Request */,
  res /* : express$Response */,
  next /* : express$NextFunction */
) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(`https://${req.hostname}${req.url}`);
  } else {
    next();
  }
});
app.use(compression());
app.use(mongoSanitize());

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
