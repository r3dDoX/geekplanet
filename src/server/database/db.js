const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect(process.env.MONGODB_URI, (err, dbObject) => {
  if (err) {
    console.error(err);
  }

  db = dbObject;

  process.on('exit', () => db.close());
});

module.exports = {

};