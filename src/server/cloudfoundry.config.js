const env = process.env;

module.exports = {
  getMongoDbUri() {
    const vcapServices = env.VCAP_SERVICES && JSON.parse(env.VCAP_SERVICES);
    return vcapServices.mongodb && vcapServices.mongodb[0].credentials.database_uri;
  },
};
