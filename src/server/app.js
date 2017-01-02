/* @flow */

const path = require('path');

const express = require('express');
const compression = require('compression');

const app = express();
app.use(compression());
const api = require('./api');

const server = app.listen(process.env.PORT || 3000, () => {
  console.info(`Listening on port ${server.address().port}`);
});

app.use('/', express.static('dist/'));

api.registerEndpoints(app);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../../dist', 'index.html')));
