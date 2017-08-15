import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createLoadProducts } from '../actions';
import MainSpinner from '../layout/mainSpinner.jsx';
import ProductList from '../products/productList.jsx';
import { ProductPropType } from '../propTypes';
import ProductFilter from './productfilter/productFilter.jsx';

class Products extends React.Component {
  componentWillMount() {
    if (!this.props.products.length) {
      this.props.loadProducts();
    }
  }

  render() {
    return (
      <div>
        <ProductFilter />
        {this.props.products.length ? (
          <ProductList products={this.props.filteredProducts} />
        ) : (
          <MainSpinner />
        )}
      </div>
    );
  }
}

Products.propTypes = {
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  loadProducts: PropTypes.func.isRequired,
  filteredProducts: PropTypes.arrayOf(ProductPropType).isRequired,
};

export default connect(
  state => ({
    products: state.products.products,
    filteredProducts: state.products.filteredProducts,
  }),
  dispatch => ({
    loadProducts() {
      dispatch(createLoadProducts());
    },
  }),
)(Products);
