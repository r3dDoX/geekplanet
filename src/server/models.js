const mongoose = require('mongoose');

const models = {};

const gridfs = require('mongoose-gridfs')({
  collection: 'productpictures',
  model: 'ProductPictures',
});

models.ProductPictures = gridfs.model;

const address = {
  streetName: String,
  streetNumber: String,
  zip: Number,
  city: String,
};

const AddressSchema = mongoose.Schema(address);

models.ProductCategory = mongoose.model('ProductCategory', {
  name: String,
});

const ProductSchema = mongoose.Schema({
  name: String,
  category: String,
  shortDescription: String,
  description: String,
  price: Number,
  purchasePrice: Number,
  purchasePackageSize: Number,
  stock: Number,
  minStock: Number,
  supplier: mongoose.Schema.Types.ObjectId,
  supplierProductCode: String,
  producer: mongoose.Schema.Types.ObjectId,
  remarks: String,
  files: [String],
});

models.Product = mongoose.model('Product', ProductSchema);

models.Producer = mongoose.model('Producer', {
  name: String,
  vatNumber: String,
  address: AddressSchema,
  contactName: String,
  contactEmail: String,
  contactPhone: String,
  remarks: String,
});

models.Supplier = mongoose.model('Supplier', {
  name: String,
  vatNumber: String,
  address: AddressSchema,
  contactName: String,
  contactEmail: String,
  contactPhone: String,
  customerNumber: String,
  remarks: String,
});

models.UserAddress = mongoose.model('UserAddress', Object.assign({
  user: String,
  firstName: String,
  lastName: String,
}, address));

const OrderItemSchema = mongoose.Schema({
  amount: Number,
  product: ProductSchema,
});

models.OrderState = {
  STARTED: 'STARTED',
  FINISHED: 'FINISHED',
};

models.Order = mongoose.model('Order', {
  _id: String,
  state: {
    type: String,
    enum: Object.keys(models.OrderState),
    default: models.OrderState.STARTED,
  },
  user: String,
  date: {
    type: Date,
    default: Date.now(),
  },
  items: [OrderItemSchema],
});

module.exports = models;
