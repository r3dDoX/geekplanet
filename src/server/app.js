// @flow

const path = require('path');
const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const cloudFoundryConfig = require('./cloudfoundry.config.js');
const Logger = require('./logger');

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

const mongoURI = process.env.MONGODB_URI
  || process.env.MONGOHQ_URL
  || cloudFoundryConfig.getMongoDbUri();
mongoose.Promise = Promise;
mongoose.connect(mongoURI);

const server = app.listen(process.env.PORT || 3000, () => {
  Logger.info(`Listening on port ${server.address().port}`);
});

app.use('/', express.static('dist/', {
  maxAge: '1y',
}));

require('./authorizedApi').registerEndpoints(app);
require('./publicApi').registerEndpoints(app);

app.get('/*', (req /* : express$Request */, res /* : express$Response */) =>
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
);
