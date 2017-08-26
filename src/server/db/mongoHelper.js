const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const Logger = require('../logger');

const mongoURI = process.env.MONGODB_URI || process.env.MONGOHQ_URL;
mongoose.Promise = Promise;
mongoose.connect(mongoURI);

const mongoHelper = {
  init() {
    const connection = mongoose.createConnection(mongoURI);
    connection.once('open', () => {
      mongoHelper.gridfs = Grid(connection.db, mongoose.mongo);
    });
  },
  gridfs: undefined,
  saveOrUpdate(Collection, document) {
    if (document._id) {
      return Collection.findOneAndUpdate({ _id: document._id }, document, { upsert: true }).exec();
    }
    return new Collection(document).save();
  },
  handleGenericError(error, response) {
    Logger.error(error);
    response.status(500).send(error);
  },
};

module.exports = mongoHelper;
