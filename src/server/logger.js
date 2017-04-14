// @flow
/* eslint no-console: 0 */

const chalk = require('chalk');

const debug = Boolean(process.env.DEBUG);

module.exports = {
  debug(messageToLog /* : string */) {
    if (debug) {
      console.log(chalk.cyan(messageToLog));
    }
  },

  error(messageToLog /* : string */) {
    console.error(chalk.red(messageToLog));
  },

  info(messageToLog /* : string */) {
    console.info(messageToLog);
  },
};
