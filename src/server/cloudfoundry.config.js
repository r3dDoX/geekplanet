const env = process.env;

module.exports = {
  getMongoDbUri() {
    const vcap_services = env.VCAP_SERVICES && JSON.parse(env.VCAP_SERVICES);
    return vcap_services.mongodb && vcap_services.mongodb[0].credentials.database_uri;
  }
};