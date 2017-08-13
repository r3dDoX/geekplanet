const localConfig = require('./local.config.json');
const stagingConfig = require('./staging.config.json');
const prodConfig = require('./production.config.json');

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
};
