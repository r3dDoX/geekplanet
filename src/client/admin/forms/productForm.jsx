import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, initialize, reduxForm } from 'redux-form';
import { createLoadProducts } from '../../actions';
import SelectField from '../../formHelpers/selectField.jsx';
import TextField from '../../formHelpers/textField.jsx';
import * as ProductService from '../../products/productService';
import {
  ProducerPropType,
  ProductCategoryPropType,
  ProductPropType,
  SupplierPropType,
} from '../../propTypes';
import {
  createLoadCompleteProducts,
  createLoadProducers,
  createLoadSuppliers,
  createLoadTags,
  createRemoveFile,
  createRemoveTag,
  createResetSelectedFiles,
  createSelectFiles,
  createSelectProduct,
  createSelectTag,
  productFormName,
} from '../adminActions';
import Tags from '../tags/tags.jsx';
import UploadImagePreview from './uploadImagePreview.jsx';

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
  selectFields: {
    verticalAlign: 'bottom',
  },
  fileInput: {
    display: 'none',
  },
};

class ProductForm extends React.Component {
  componentDidMount() {
    const {
      products,
      selectProduct,
      match,
    } = this.props;

    if (match.params.id) {
      selectProduct(products.find(product => product._id === match.params.id));
    }
  }

  render() {
    const {
      handleSubmit,
      onSubmit,
      products,
      selectProduct,
      suppliers,
      producers,
      productCategories,
      selectedFiles,
      selectFiles,
      removeFile,
      tags,
      savedTags,
      selectTag,
      removeTag,
      match,
      history,
    } = this.props;

    return (
      <form
        style={styles.container}
        name={productFormName}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field
          component={SelectField}
          name="_id"
          onChange={(event, value) => {
            selectProduct(products.find(product => product._id === value));
            history.push(`/admin/forms/products/${value}`);
          }}
          selectedValue={match.params.id || ''}
        >
          <MenuItem
            value=""
            primaryText="Create new"
          />
          <Divider />
          {products.map(({ _id, de: { name } }) => (
            <MenuItem
              key={_id}
              value={_id}
              primaryText={name}
            />
          ))}
        </Field>
        <br />

        <Field
          component={TextField}
          name="de.name"
          label="Name"
          type="text"
        />&nbsp;
        <Field
          component={SelectField}
          name="category"
          label="Product Category"
          style={styles.selectFields}
        >
          {productCategories.map(category => (
            <MenuItem
              key={category._id}
              value={category._id}
              primaryText={category.de.name}
            />
          ))}
        </Field>
        <br />
        <Tags
          savedTags={savedTags}
          tags={tags}
          selectTag={selectTag}
          removeTag={removeTag}
        />
        <br />
        <Field
          component={TextField}
          name="de.shortDescription"
          label="Short Description"
          type="text"
          multiLine
          rows={3}
        />
        <br />
        <Field
          component={TextField}
          name="de.description"
          label="Description"
          type="text"
          multiLine
          rows={5}
        />
        <br />
        <Field
          component={TextField}
          name="price"
          label="Price"
          type="number"
          step="any"
        />&nbsp;
        <Field
          component={TextField}
          name="purchasePrice"
          label="Purchase Price"
          type="number"
          step="any"
        />&nbsp;
        <Field
          component={TextField}
          name="purchasePackageSize"
          label="Purchase Package Size"
          type="number"
        />
        <br />
        <Field
          component={TextField}
          name="stock"
          label="Stock"
          type="number"
        />&nbsp;
        <Field
          component={TextField}
          name="minStock"
          label="Stock Minimum"
          type="number"
        />
        <br />
        <Field
          component={SelectField}
          name="supplier"
          label="Supplier"
          style={styles.selectFields}
        >
          {suppliers.map(({ _id, name }) => (
            <MenuItem
              key={_id}
              value={_id}
              primaryText={name}
            />
          ))}
        </Field>&nbsp;
        <Field
          component={TextField}
          name="supplierProductCode"
          label="Supplier Product Code"
          type="text"
        />
        <br />
        <Field
          component={SelectField}
          name="producer"
          label="Producer"
        >
          {producers.map(({ _id, name }) => (
            <MenuItem
              key={_id}
              value={_id}
              primaryText={name}
            />
          ))}
        </Field>
        <br />
        <Field
          component={TextField}
          name="remarks"
          label="Remarks"
          type="text"
          multiLine
        />
        <br />
        <RaisedButton
          label="Choose images"
          labelPosition="before"
          containerElement="label"
          style={styles.uploadButton}
        >
          <input
            type="file"
            accept="image/jpeg,image/png"
            multiple
            style={styles.fileUploadInput}
            onChange={event => selectFiles(event.target.files, selectedFiles)}
          />
        </RaisedButton>
        <UploadImagePreview files={selectedFiles} removeFile={removeFile} />
        <RaisedButton label="Save" type="submit" primary />
      </form>
    );
  }
}

ProductForm.defaultProps = {
  selectedProductProductCategory: undefined,
  selectedProductProducer: undefined,
  selectedProductSupplier: undefined,
};

ProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  producers: PropTypes.arrayOf(ProducerPropType).isRequired,
  suppliers: PropTypes.arrayOf(SupplierPropType).isRequired,
  selectedFiles: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectFiles: PropTypes.func.isRequired,
  removeFile: PropTypes.func.isRequired,
  selectProduct: PropTypes.func.isRequired,
  savedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  state => state.forms,
  (dispatch) => {
    function loadProducts() {
      dispatch(createLoadCompleteProducts());
    }

    function clearForm() {
      dispatch(initialize(productFormName));
    }

    function resetSelectedFiles() {
      dispatch(createResetSelectedFiles());
    }

    return {
      onSubmit(productToSubmit) {
        ProductService.saveProduct(productToSubmit)
          .then(loadProducts)
          .then(() => {
            dispatch(createLoadProducts());
            clearForm();
            resetSelectedFiles();
          });
      },
      clearForm,
      selectFiles(selectedFiles, initialFiles) {
        dispatch(createSelectFiles(selectedFiles, initialFiles));
      },
      removeFile(initialFiles, fileIdToRemove) {
        dispatch(createRemoveFile(initialFiles, fileIdToRemove));
      },
      loadProducts,
      selectProduct(product) {
        dispatch(createSelectProduct(product));
        dispatch(initialize(productFormName, product));
      },
      loadProducers() {
        dispatch(createLoadProducers());
      },
      loadSuppliers() {
        dispatch(createLoadSuppliers());
      },
      loadTags() {
        dispatch(createLoadTags());
      },
      selectTag(tags, item, index) {
        dispatch(createSelectTag(tags, item, index));
      },
      removeTag(tags, tag) {
        dispatch(createRemoveTag(tags, tag));
      },
    };
  },
)(reduxForm({
  form: productFormName,
  destroyOnUnmount: false,
})(withRouter(ProductForm)));
