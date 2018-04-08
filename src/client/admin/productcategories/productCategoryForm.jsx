import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Field, initialize, reduxForm } from 'redux-form';
import SelectField from '../../formHelpers/selectField.jsx';
import TextField from '../../formHelpers/textField.jsx';
import { ProductCategoryPropType } from '../../propTypes';
import { createLoadProductCategories } from '../../actions';
import ProductCategoryService from './productCategoryService';

const formName = 'productcategories';

const styles = {
  container: {
    padding: '24px',
  },
};

const ProductCategoriesForm = ({
  handleSubmit,
  onSubmit,
  productCategories,
  selectProductCategory,
}) => (
  <form
    style={styles.container}
    name={formName}
    onSubmit={handleSubmit(onSubmit)}
  >
    <Field
      component={SelectField}
      name="_id"
      onChange={(event, value) => selectProductCategory(
        productCategories.find(productCategory => productCategory._id === value)
      )}
    >
      <MenuItem
        value=""
        primaryText="Create new"
      />
      <Divider />
      {productCategories.map(category => (
        <MenuItem
          key={category._id}
          value={category._id}
          primaryText={category.de.name}
        />
      ))}
    </Field>
    <br />
    <Field
      component={TextField}
      name="de.name"
      label="Name"
      type="text"
    />
    <br />
    <Field
      component={TextField}
      name="order"
      label="Order"
      type="number"
    />
    <br />
    <Field
      component={SelectField}
      name="parentCategory"
      label="Parent Category"
    >
      <MenuItem value={null} primaryText="None" />
      <Divider />
      {productCategories.map(category => (
        <MenuItem
          key={category._id}
          value={category._id}
          primaryText={category.de.name}
        />
      ))}
    </Field>
    <br />
    <RaisedButton label="Save" primary type="submit" />
  </form>
);

ProductCategoriesForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectProductCategory: PropTypes.func.isRequired,
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
};

export default connect(
  state => state.forms,
  (dispatch) => {
    function loadProductCategories() {
      dispatch(createLoadProductCategories());
    }

    function clearForm() {
      dispatch(initialize(formName));
    }

    return {
      selectProductCategory(productCategory) {
        dispatch(initialize(formName, productCategory));
      },
      onSubmit(productCategory) {
        ProductCategoryService.saveProductCategory(productCategory)
          .then(loadProductCategories)
          .then(() => clearForm(formName));
      },
    };
  },
)(reduxForm({
  form: formName,
  destroyOnUnmount: false,
})(ProductCategoriesForm));
