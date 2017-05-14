import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductList from '../products/productList.jsx';
import { ProductPropType } from '../propTypes';
import { createLoadProducts } from '../actions';

class Products extends React.Component {
  componentWillMount() {
    if (this.props.loadProducts.length === 0) {
      this.props.loadProducts();
    }
  }

  render() {
    const { products } = this.props;

    return (
      <div>
        <ProductList products={products} />
      </div>
    );
  }
}

Products.propTypes = {
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  loadProducts: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    products: state.products.products,
  }),
  dispatch => ({
    loadProducts() {
      dispatch(createLoadProducts());
    },
  })
)(Products);
