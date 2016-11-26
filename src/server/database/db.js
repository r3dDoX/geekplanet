/* @flow */

const env = process.env;
const vcap_services = env.VCAP_SERVICES && JSON.parse(env.VCAP_SERVICES);
const mongoURI = env.MONGODB_URI || vcap_services.mongodb && vcap_services.mongodb[0].credentials.database_uri;
const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect(mongoURI, (err, dbObject) => {
  if (err) {
    console.dir(err);
  }

  db = dbObject;

  process.on('exit', () => db.close());

  db.listCollections().toArray((err, items) => {
    console.log(items);
  });

});

module.exports = {

};