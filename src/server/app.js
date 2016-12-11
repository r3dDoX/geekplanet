/* @flow */

const path = require('path');

const express = require('express');

const app = express();
const api = require('./api');

const server = app.listen(process.env.PORT || 3000, () => {
  console.info(`Listening on port ${server.address().port}`);
});

app.use('/', express.static('dist/'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../../dist', 'index.html')));

api.registerEndpoints(app);
