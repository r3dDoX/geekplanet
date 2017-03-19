import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ActionTypes from '../../actionTypes';
import ProductService from '../../products/productService';
import UploadImagePreview from './uploadImagePreview.jsx';
import extractAndSubmitForm from './extractAndSubmitForm';
import ProducerService from '../producers/producerService';
import SupplierService from '../suppliers/supplierService';

const styles = {
  container: {
    padding: '24px',
  },
  fileUploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  uploadButton: {
    marginTop: '10px',
  },
};

const ProductForm = ({
  productCategories,
  selectedProductProductCategory,
  suppliers,
  selectedProductSupplier,
  producers,
  selectedFiles,
  onSelectFile,
  selectedProductProducer,
  selectProductCategory,
  selectSupplier,
  selectProducer,
}) => (
  <form
    style={styles.container}
    name="products"
    onSubmit={(event) => {
      event.preventDefault();
      extractAndSubmitForm(ProductService.saveProduct, event.target);
    }}
  >
    <TextField floatingLabelText="Name" name="name" type="text" fullWidth />

    <SelectField
      floatingLabelText="Category"
      value={selectedProductProductCategory}
      onChange={(event, index, value) => selectProductCategory(value)}
      autoWidth
    >
      {productCategories.map(category => (
        <MenuItem value={category.name} key={category._id} primaryText={category.name} />
      ))}
    </SelectField>

    <TextField
      floatingLabelText="Short Description"
      name="shortDescription"
      type="text"
      multiLine
      rows={3}
      fullWidth
    />

    <TextField
      floatingLabelText="Description"
      name="description"
      type="text"
      multiLine
      rows={5}
      fullWidth
    />

    <TextField
      floatingLabelText="Price"
      name="price"
      type="number"
      step="any"
      fullWidth
    />
    <TextField
      floatingLabelText="Purchase Price"
      name="purchasePrice"
      type="number"
      step="any"
      fullWidth
    />
    <TextField
      floatingLabelText="Purchase Package Size"
      name="purchasePackageSize"
      type="number"
      fullWidth
    />

    <TextField
      floatingLabelText="Stock"
      name="stock"
      defaultValue="0"
      type="number"
      fullWidth
    />

    <TextField
      floatingLabelText="Stock Minimum"
      name="minStock"
      defaultValue="0"
      type="number"
      fullWidth
    />

    <SelectField
      floatingLabelText="Supplier"
      value={(suppliers.find(supplier => supplier._id === selectedProductSupplier) || {})._id}
      onChange={(event, index, value) => selectSupplier(value)}
      autoWidth
    >
      {suppliers.map(supplier => (
        <MenuItem value={supplier._id} key={supplier._id} primaryText={supplier.name} />
      ))}
    </SelectField>

    <TextField
      floatingLabelText="Supplier Product Code"
      name="supplierProductCode"
      type="text"
      fullWidth
    />

    <SelectField
      floatingLabelText="Producer"
      value={(producers.find(producer => producer._id === selectedProductProducer) || {})._id}
      onChange={(event, index, value) => selectProducer(value)}
      autoWidth
    >
      {producers.map(producer => (
        <MenuItem value={producer._id} key={producer._id} primaryText={producer.name} />
      ))}
    </SelectField>

    <TextField
      floatingLabelText="Remarks"
      name="remarks"
      type="text"
      multiLine
      fullWidth
    />

    <RaisedButton
      label="Choose images"
      labelPosition="before"
      containerElement="label"
      fullWidth
      style={styles.uploadButton}
    >
      <input
        name="productPictures[]"
        type="file"
        accept="image/jpeg,image/png"
        multiple
        style={styles.fileUploadInput}
        onChange={event => onSelectFile(event.target.files)}
      />
    </RaisedButton>
    <UploadImagePreview files={selectedFiles} />
    <RaisedButton label="Save" type="submit" primary />
  </form>
);

ProductForm.defaultProps = {
  selectedFiles: undefined,
  selectedProductProductCategory: undefined,
  selectedProductProducer: undefined,
  selectedProductSupplier: undefined,
};

ProductForm.propTypes = {
  selectedFiles: PropTypes.instanceOf(FileList),
  selectedProductProductCategory: PropTypes.string,
  productCategories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  selectedProductProducer: PropTypes.string,
  producers: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  selectedProductSupplier: PropTypes.string,
  suppliers: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  onSelectFile: PropTypes.func.isRequired,
  selectProductCategory: PropTypes.func.isRequired,
  selectProducer: PropTypes.func.isRequired,
  selectSupplier: PropTypes.func.isRequired,
};

export default connect(
  state => state.forms,
  dispatch => ({
    onSelectFile(selectedFiles) {
      dispatch({
        type: ActionTypes.SELECT_UPLOAD_FILES,
        data: selectedFiles,
      });
    },
    loadProductCategories() {
      ProductService.loadProductCategories().then(categories => dispatch({
        type: ActionTypes.PRODUCT_CATEGORIES_LOADED,
        data: categories,
      }));
    },
    loadProducers() {
      ProducerService.loadProducers().then(categories => dispatch({
        type: ActionTypes.PRODUCERS_LOADED,
        data: categories,
      }));
    },
    loadSuppliers() {
      SupplierService.loadSuppliers().then(categories => dispatch({
        type: ActionTypes.SUPPLIERS_LOADED,
        data: categories,
      }));
    },
    selectProductCategory(category) {
      dispatch({
        type: ActionTypes.PRODUCT_CATEGORY_SELECTED,
        data: category,
      });
    },
    selectProducer(producerId) {
      dispatch({
        type: ActionTypes.SELECT_PRODUCT_PRODUCER,
        data: producerId,
      });
    },
    selectSupplier(supplierId) {
      dispatch({
        type: ActionTypes.SELECT_PRODUCT_SUPPLIER,
        data: supplierId,
      });
    },
  })
)(ProductForm);
