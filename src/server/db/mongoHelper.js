const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const mongoURI = process.env.MONGODB_URI || process.env.MONGOHQ_URL;
mongoose.Promise = Promise;
mongoose.connect(mongoURI, { useMongoClient: true });

const mongoHelper = {
  init() {
    const connection = mongoose.createConnection(mongoURI, { useMongoClient: true });
    connection.once('open', () => {
      mongoHelper.gridfs = Grid(connection.db, mongoose.mongo);
    });
  },
  gridfs: undefined,
};

module.exports = mongoHelper;
