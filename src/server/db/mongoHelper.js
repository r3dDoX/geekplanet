const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const Logger = require('../logger');

const mongoURI = process.env.MONGODB_URI || process.env.MONGOHQ_URL;

const mongoHelper = {
  init() {
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      poolSize: 10,
    }).catch(Logger.error);
    mongoose.connection.on('error', Logger.error);
    mongoose.connection.once('open', () => {
      this.gridfs = Grid(mongoose.connection.db, mongoose.mongo);
    });
  },
  gridfs: undefined,
  saveOrUpdate(Collection, document) {
    if (document._id) {
      return Collection.findOneAndUpdate({ _id: document._id }, document, { upsert: true }).exec();
    }
    return new Collection(document).save();
  },
};

module.exports = mongoHelper;
