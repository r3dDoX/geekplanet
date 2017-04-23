import React from 'react';
import PropTypes from 'prop-types';
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
    const { locale, products, addItemToShoppingCart } = this.props;
    return (
      <div style={styles.container}>
        {products.map(product => (
          <ProductTile
            key={product._id}
            locale={locale}
            product={product}
            addItemToShoppingCart={addItemToShoppingCart}
          />
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  locale: PropTypes.string.isRequired,
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
  state => ({
    products: state.products.products,
    locale: state.i18n.locale,
  }),
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
