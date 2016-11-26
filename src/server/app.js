/* @flow */

const express = require('express');
const app = express();


const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

app.use('/', express.static('dist/'));
app.get('/api/test', (req, res) => {
  res.send('Hello World');
});

require('./database/db');
