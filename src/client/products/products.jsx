import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductList from '../products/productList.jsx';
import { ProductPropType } from '../propTypes';
import { createFilterProducts, createLoadProducts } from '../actions';
import ProductFilter from './productfilter/productFilter.jsx';

class Products extends React.Component {
  componentWillMount() {
    if (this.props.loadProducts.length === 0) {
      this.props.loadProducts();
    }
  }

  render() {
    const { products, filteredProducts, filterProducts } = this.props;

    return (
      <div>
        <ProductFilter
          products={products}
          filterProducts={filterProducts}
        />
        <ProductList
          items={filteredProducts}
          itemHeight={425}
        />
      </div>
    );
  }
}

Products.propTypes = {
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  loadProducts: PropTypes.func.isRequired,
  filteredProducts: PropTypes.arrayOf(ProductPropType).isRequired,
  filterProducts: PropTypes.func.isRequired,
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
    filterProducts(filteredProducts) {
      dispatch(createFilterProducts(filteredProducts));
    },
  })
)(Products);
