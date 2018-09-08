import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import actions from 'redux-form/es/actions';
import { createLoadProductCategories } from '../../actions';
import SelectField from '../../formHelpers/selectField';
import TextField from '../../formHelpers/textField';
import { ProductCategoryPropType } from '../../propTypes';
import ProductCategoryService from './productCategoryService';

const { initialize } = actions;
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
        productCategories.find(productCategory => productCategory._id === value),
      )}
      label="Create new"
    >
      <MenuItem value="">
        Create new
      </MenuItem>
      <Divider />
      {productCategories.map(category => (
        <MenuItem
          key={category._id}
          value={category._id}
        >
          {category.de.name}
        </MenuItem>
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
      <MenuItem value={null}>
        None
      </MenuItem>
      <Divider />
      {productCategories.map(category => (
        <MenuItem
          key={category._id}
          value={category._id}
        >
          {category.de.name}
        </MenuItem>
      ))}
    </Field>
    <br />
    <Button variant="contained" color="primary" type="submit">
      Save
    </Button>
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
