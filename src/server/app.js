/* @flow */

const path = require('path');
const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const cloudFoundryConfig = require('./cloudfoundry.config.js');

const app = express();
app.use(compression());
app.use(mongoSanitize());

const mongoURI = process.env.MONGODB_URI || cloudFoundryConfig.getMongoDbUri();
mongoose.Promise = Promise;
mongoose.connect(mongoURI);

const server = app.listen(process.env.PORT || 3000, () => {
  console.info(`Listening on port ${server.address().port}`);
});

app.use('*', (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(`https://${req.host}${req.url}`);
  } else {
    next();
  }
});

app.use('/', express.static('dist/', {
  maxAge: '1d',
}));

require('./authorizedApi').registerEndpoints(app);
require('./publicApi').registerEndpoints(app);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../../dist', 'index.html')));
