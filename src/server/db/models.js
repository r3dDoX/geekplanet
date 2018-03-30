const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const OrderState = require('../../common/orderState');

const models = {};

models.ProductPicturesCollection = 'productpictures';

const address = {
  streetAddress: String,
  zip: Number,
  city: String,
  country: String,
};

const AddressSchema = mongoose.Schema(address);

const ProductCategoryTranslationsSchema = {
  name: String,
};

models.ProductCategory = mongoose.model('ProductCategory', {
  parentCategory: mongoose.Schema.Types.Object,
  de: ProductCategoryTranslationsSchema,
  en: ProductCategoryTranslationsSchema,
  fr: ProductCategoryTranslationsSchema,
  it: ProductCategoryTranslationsSchema,
});

models.Tag = mongoose.model('Tag', {
  name: {
    type: String,
    index: true,
    unique: true,
  },
});

const DownloadLinkSchema = {
  text: String,
  href: String,
};

const ProductTranslationsSchema = {
  name: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  specifications: [String],
  delivery: [String],
  downloads: [DownloadLinkSchema],
};

const ProductSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  },
  number: {
    type: Number,
    index: true,
  },
  de: ProductTranslationsSchema,
  // TODO: translate all our products
  // en: ProductTranslationsSchema,
  // fr: ProductTranslationsSchema,
  // it: ProductTranslationsSchema,
  price: Number,
  originalPrice: Number,
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

const InvoiceSchema = mongoose.Schema({
  user: {
    type: String,
    index: true,
  },
  esr: String,
  invoiceNumber: {
    type: Number,
    index: true,
  },
  value: Number,
  address: UserAddressSchema,
});
InvoiceSchema.plugin(AutoIncrement, { inc_field: 'invoiceNumber' });
models.Invoice = mongoose.model('Invoice', InvoiceSchema);

const CouponSchema = mongoose.Schema({
  _id: {
    type: String,
  },
  amount: Number,
  date: Date,
});
models.Coupon = mongoose.model('Coupon', CouponSchema);

models.Order = mongoose.model('Order', {
  _id: {
    type: String,
  },
  state: {
    type: String,
    enum: Object.keys(OrderState),
    default: OrderState.STARTED,
  },
  user: {
    type: String,
    index: true,
  },
  address: UserAddressSchema,
  date: {
    type: Date,
    index: true,
  },
  items: [OrderItemSchema],
  coupons: [CouponSchema],
  itemTotal: {
    type: Number,
  },
  total: {
    type: Number,
  },
  invoice: mongoose.Schema.Types.ObjectId,
});


const HomeTileName = mongoose.Schema({
  name: String,
});

models.HomeTile = mongoose.model('HomeTile', {
  de: HomeTileName,
  fr: HomeTileName,
  it: HomeTileName,
  en: HomeTileName,
  category: mongoose.Schema.Types.ObjectId,
  picture: String,
  order: {
    type: Number,
    default: 0,
    index: true,
  },
});

module.exports = models;
