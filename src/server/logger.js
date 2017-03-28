/* eslint no-console: 0 */

const chalk = require('chalk');

const debug = Boolean(process.env.DEBUG);

module.exports = {
  debug(messageToLog) {
    if (debug) {
      console.log(chalk.cyan(messageToLog));
    }
  },

  error(messageToLog) {
    console.error(chalk.red(messageToLog));
  },

  info(messageToLog) {
    console.info(messageToLog);
  },
};
