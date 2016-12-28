import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ActionTypes from '../actionTypes';
import ProductService from '../products/productService';
import ProductList from '../products/productList.jsx';

class HomeComponent extends React.Component {

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    return (
      <div className="content">
        <ProductList products={this.props.products} />
      </div>
    );
  }
}

HomeComponent.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.string),
  })),
  loadProducts: PropTypes.func,
};

export default connect(
  state => state.products,
  dispatch => ({
    loadProducts() {
      ProductService.loadProducts().then(data => dispatch({
        type: ActionTypes.PRODUCTS_LOADED,
        data,
      }));
    },
  })
)(HomeComponent);
