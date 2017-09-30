const fs = require('fs');
const localConfig = require('./local.config.json');
const stagingConfig = require('./staging.config.json');
const prodConfig = require('./production.config.json');
const defaultConfig = require('./default.config.json');

let secretConfig;

if (fs.existsSync('./src/config/secret.config.json')) {
  // eslint-disable-next-line global-require, import/no-unresolved
  secretConfig = require('./secret.config.json');
}

module.exports = {
  getEnvKey() {
    return process.env.CONFIG;
  },
  getEnvironmentSpecificConfig() {
    switch (process.env.CONFIG) {
      case 'staging':
        return Object.assign(defaultConfig, stagingConfig);
      case 'production':
        return Object.assign(defaultConfig, prodConfig);
      default:
        return Object.assign(defaultConfig, localConfig);
    }
  },
  getSecretKey(key) {
    if (secretConfig) {
      return secretConfig[key];
    }

    return process.env[key];
  },
};
