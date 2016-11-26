/* @flow */

const env = process.env;
const mongoURI = env.MONGODB_URI || env.VCAP_SERVICES && env.VCAP_SERVICES.mongodb && env.VCAP_SERVICES.mongodb[0].uri;
const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect(`${mongoURI}/geekplanet`, (err, dbObject) => {
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