const fs = require('fs');
const localConfig = require('./local.config.json');
const stagingConfig = require('./staging.config.json');
const prodConfig = require('./production.config.json');

let secretConfig;

if (fs.existsSync('./src/config/secret.config.json')) {
  // eslint-disable-next-line global-require
  secretConfig = require('./secret.config.json');
}

module.exports = {
  getEnvironmentSpecificConfig() {
    switch (process.env.CONFIG) {
      case 'staging':
        return stagingConfig;
      case 'production':
        return prodConfig;
      default:
        return localConfig;
    }
  },
  getSecretKey(key) {
    if (secretConfig) {
      return secretConfig[key];
    }

    return process.env[key];
  },
};
