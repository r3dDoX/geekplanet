// @flow

const mongoose = require('mongoose');

const models = {};

const gridfs = require('mongoose-gridfs')({
  collection: 'productpictures',
  model: 'ProductPictures',
});

models.ProductPictures = gridfs.model;

const address = {
  streetAddress: String,
  zip: Number,
  city: String,
  country: String,
};

const AddressSchema = mongoose.Schema(address);

models.ProductCategory = mongoose.model('ProductCategory', {
  parentCategory: String,
  name: {
    type: String,
    unique: true,
  },
});

models.Tag = mongoose.model('Tag', {
  name: {
    type: String,
    index: true,
    unique: true,
  },
});

const ProductSchema = mongoose.Schema({
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  },
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
  tags: [String],
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
  customerNumber: String,
  address: AddressSchema,
  bank: String,
  iban: String,
  bic: String,
  bankRemarks: String,
  contactName: String,
  contactEmail: String,
  contactPhone: String,
  remarks: String,
});

const UserAddressSchema = mongoose.Schema(Object.assign(
  {},
  {
    user: {
      type: String,
      index: true,
    },
    title: String,
    firstName: String,
    lastName: String,
  },
  address
));

models.UserAddress = mongoose.model('UserAddress', UserAddressSchema);

const OrderItemSchema = mongoose.Schema({
  amount: Number,
  product: ProductSchema,
});

models.OrderState = {
  STARTED: 'STARTED',
  FINISHED: 'FINISHED',
};

models.Order = mongoose.model('Order', {
  _id: {
    type: String,
    index: true,
  },
  state: {
    type: String,
    enum: Object.keys(models.OrderState),
    default: models.OrderState.STARTED,
  },
  user: {
    type: String,
    index: true,
  },
  address: UserAddressSchema,
  date: {
    type: Date,
    default: Date.now(),
    index: true,
  },
  items: [OrderItemSchema],
});

module.exports = models;
