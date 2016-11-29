/* @flow */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/db');

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

app.use(bodyParser.json());
app.use('/', express.static('dist/'));

app.get('/api/test', (req, res) => {
  res.send('Hello World');
});

app.post('/api/products', (req, res) => {
  db.insertOrUpdate('products', req.body)
    .then(() => res.sendStatus(200))
    .catch((error) => res.send(error));
});

app.post('/api/suppliers', (req, res) => {
  db.insertOrUpdate('suppliers', req.body)
    .then(() => res.sendStatus(200))
    .catch((error) => res.send(error));
});

app.post('/api/producers', (req, res) => {
  db.insertOrUpdate('producers', req.body)
    .then(() => res.sendStatus(200))
    .catch((error) => res.send(error));
});