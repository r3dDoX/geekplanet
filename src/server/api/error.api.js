const router = require('express').Router();
const bodyParser = require('body-parser');
const Logger = require('../logger');

router.post('/log', bodyParser.json(), (req, res) => {
  const {
    message,
    url,
    lineNo,
    colNo,
    error,
  } = req.body;

  Logger.error(`Client Error:
  Message: ${message}
  URL: ${url}
  Row: ${lineNo}
  Col: ${colNo}`);
  if (error && error.stack) {
    Logger.error(error.stack);
  }

  res.sendStatus(200);
});

module.exports = router;
