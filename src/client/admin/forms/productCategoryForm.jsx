import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ProductService from '../../products/productService';
import ActionTypes from '../../actionTypes';
import extractAndSubmitForm from './extractAndSubmitForm';

const styles = {
  container: {
    padding: '24px',
  },
};

const ProductCategoriesComponent = ({
  loadProductCategories,
}) => (
  <form
    style={styles.container}
    name="productcategories"
    onSubmit={(event) => {
      event.preventDefault();
      extractAndSubmitForm(ProductService.saveProductCategory, event.target)
        .then(loadProductCategories);
    }}
  >
    <TextField floatingLabelText="Name" name="name" type="text" fullWidth />

    <RaisedButton label="Save" primary type="submit" />
  </form>
);

ProductCategoriesComponent.propTypes = {
  loadProductCategories: PropTypes.func.isRequired,
};

export default connect(
  state => state.forms,
  dispatch => ({
    loadProductCategories() {
      ProductService.loadProductCategories().then(categories => dispatch({
        type: ActionTypes.PRODUCT_CATEGORIES_LOADED,
        data: categories,
      }));
    },
  })
)(ProductCategoriesComponent);
