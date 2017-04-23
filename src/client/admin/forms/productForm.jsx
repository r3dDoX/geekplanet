import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import UploadImagePreview from './uploadImagePreview.jsx';
import TextField from '../../formHelpers/textField.jsx';
import SelectField from '../../formHelpers/selectField.jsx';
import {
  ProductPropType,
  ProducerPropType,
  SupplierPropType,
  ProductCategoryPropType,
} from './forms.proptypes';
import Tags from '../tags/tags.jsx';

export const formName = 'products';

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

const ProductForm = ({
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
}) => (
  <form
    style={styles.container}
    name={formName}
    onSubmit={handleSubmit(onSubmit)}
  >
    <Field
      component={SelectField}
      name="_id"
      onChange={(event, value) => selectProduct(value)}
    >
      <MenuItem
        value=""
        primaryText="Create new"
      />
      <Divider />
      {products.map(({ _id, de: { name } }) => <MenuItem
        key={_id}
        value={_id}
        primaryText={name}
      />)}
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
      {productCategories.map(category => <MenuItem
        key={category._id}
        value={category._id}
        primaryText={category.de.name}
      />)}
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
      {suppliers.map(({ _id, name }) => <MenuItem
        key={_id}
        value={_id}
        primaryText={name}
      />)}
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
      {producers.map(({ _id, name }) => <MenuItem
        key={_id}
        value={_id}
        primaryText={name}
      />)}
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
        onChange={event => selectFiles(event.target.files)}
      />
    </RaisedButton>
    <UploadImagePreview files={selectedFiles} removeFile={removeFile} />
    <RaisedButton label="Save" type="submit" primary />
  </form>
);

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
};

export default reduxForm({
  form: formName,
  destroyOnUnmount: false,
})(ProductForm);
