import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductList from '../products/productList.jsx';
import Xhr from '../xhr';
import ActionTypes from '../actionTypes';
import ProductPropType from '../products/product.proptypes';

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
      Xhr.get('/api/products').then(products => dispatch({
        type: ActionTypes.PRODUCTS_LOADED,
        products,
      }));
    },
  })
)(Products);
