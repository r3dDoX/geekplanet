import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ProductTile from './productTile.jsx';
import ActionTypes from '../actionTypes';
import ProductService from './productService';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: '20px 10px',
  },
};

class ProductList extends React.Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const { products, addItemToShoppingCart } = this.props;
    return (
      <div style={styles.container}>
        {products.map(product => (
          <ProductTile
            key={product._id}
            product={product}
            addItemToShoppingCart={addItemToShoppingCart}
          />
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  loadProducts: PropTypes.func.isRequired,
  addItemToShoppingCart: PropTypes.func.isRequired,
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
    addItemToShoppingCart(product) {
      dispatch({
        type: ActionTypes.ADD_ITEM_TO_SHOPPING_CART,
        data: product,
      });
    },
  })
)(ProductList);
