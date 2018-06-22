const bodyParser = require('body-parser');
const compression = require('compression');
const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const multer = require('multer')();
const sharp = require('sharp');
const shortId = require('shortid');
const streamifier = require('streamifier');
const mongoHelper = require('../db/mongoHelper');
const { saveOrUpdate } = require('../db/mongoHelper');
const { authorization, isAdmin } = require('./auth');

const {
  Product,
  ProductPicturesCollection,
  ProductCategory,
  Producer,
} = require('../db/models');

function saveFileInSize(id, file, sizeTag, size) {
  return new Promise((resolve, reject) => {
    const writestream = mongoHelper.gridfs.createWriteStream({
      _id: `${id}_${sizeTag}`,
      filename: `${id}_${sizeTag}.jpeg}`,
      root: ProductPicturesCollection,
    });

    streamifier.createReadStream(file.buffer)
      .pipe(sharp()
        .resize(size, Math.round(size * 0.75))
        .background({
          r: 255,
          g: 255,
          b: 255,
          alpha: 1,
        })
        .flatten()
        .embed()
        .jpeg()
      )
      .pipe(writestream);

    writestream.on('close', () => resolve());
    writestream.on('error', error => reject(error));
  });
}

function removeFile(id) {
  return Promise.all([
    new Promise((resolve, reject) =>
      mongoHelper.gridfs.remove({
        _id: `${id}_s`,
        root: ProductPicturesCollection,
      }, err => (err ? reject(err) : resolve()))),
    new Promise((resolve, reject) =>
      mongoHelper.gridfs.remove({
        _id: `${id}_m`,
        root: ProductPicturesCollection,
      }, err => (err ? reject(err) : resolve()))),
    new Promise((resolve, reject) =>
      mongoHelper.gridfs.remove({
        _id: `${id}_l`,
        root: ProductPicturesCollection,
      }, err => (err ? reject(err) : resolve()))),
  ]);
}

const productFilter = {
  purchasePrice: 0,
  purchasePackageSize: 0,
  minStock: 0,
  supplier: 0,
  supplierProductCode: 0,
  remarks: 0,
};

const productListFilter = {
  _id: 1,
  category: 1,
  producer: 1,
  tags: 1,
  'de.name': 1,
  'de.shortDescription': 1,
  price: 1,
  originalPrice: 1,
  stock: 1,
  files: {
    $slice: 1,
  },
};

router.get('/', compression(),
  asyncHandler(async (req, res) => {
    const products = await Product.find({}, productListFilter).sort({ number: 1 });
    res.send(products);
  }));

router.put('/', authorization, isAdmin, bodyParser.json(),
  asyncHandler(async (req, res) => {
    await saveOrUpdate(Product, req.body);
    res.sendStatus(200);
  }));

router.post('/pictures', authorization, isAdmin, multer.any(),
  asyncHandler(async (req, res) => {
    const files = await Promise.all(req.files.map((file) => {
      const id = shortId.generate();

      return Promise.all([
        saveFileInSize(id, file, 's', 450),
        saveFileInSize(id, file, 'm', 800),
        saveFileInSize(id, file, 'l', 1600),
      ])
        .then(() => id);
    }));

    res.status(200).send(JSON.stringify(files));
  }));

router.get('/pictures/:id',
  (req, res) => {
    res.header({
      'Cache-Control': 'public, max-age=31536000',
    });

    const readStream = mongoHelper.gridfs.createReadStream({
      _id: req.params.id,
      root: ProductPicturesCollection,
    });

    readStream.on('error', () => {
      res.setHeader('content-type', 'image/jpeg');
      fs.createReadStream('src/client/assets/images/notFound.jpg').pipe(res);
    });

    readStream.pipe(res);
  });

router.delete('/pictures/:id', authorization, isAdmin,
  asyncHandler(async (req, res) => {
    await removeFile(req.params.id);
    await Product.update({}, { $pull: { files: req.params.id } }, { multi: true });
    res.sendStatus(200);
  }));

router.get('/complete', authorization, isAdmin, compression(),
  asyncHandler(async (req, res) => {
    const products = await Product.find().sort({ number: 1 });
    res.send(products);
  }));

router.get('/categories', compression(),
  asyncHandler(async (req, res) => {
    const categories = await ProductCategory.find().sort({ order: 1, 'de.name': 1 });
    res.send(categories);
  }));

router.put('/categories', authorization, isAdmin, bodyParser.json(),
  asyncHandler(async ({ body }, res) => {
    if (body._id) {
      const { name } = await ProductCategory.findOne({ _id: body._id });
      if (name !== body.name) {
        await ProductCategory.update(
          { parentCategory: name },
          { $set: { parentCategory: body.name } },
          { multi: true }).exec();
      }
    }
    await saveOrUpdate(ProductCategory, body);
    res.sendStatus(200);
  }));

router.get('/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id }, productFilter);
    const [category, producer] = await Promise.all([
      ProductCategory.findOne({ _id: product.category }),
      Producer.findOne({ _id: product.producer }),
    ]);

    res.send(Object.assign({}, product.toObject(), {
      category,
      producer,
    }));
  }));

router.delete('/:id', authorization, isAdmin,
  asyncHandler(async (req, res) => {
    const product = Product.findOne({ _id: req.params.id });
    const pictureRemovePromises = product.files.length
      ? product.files.map(productFile => removeFile(productFile))
      : [];

    await Promise.all(pictureRemovePromises);
    await Product.remove({ _id: req.params.id });
    res.sendStatus(200);
  }));

module.exports = router;
