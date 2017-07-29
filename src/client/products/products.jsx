import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductList from '../products/productList.jsx';
import { ProductCategoryPropType, ProductPropType } from '../propTypes';
import {
  createFilterProducts, createLoadProductCategories, createLoadProducts,
  createToggleFilterCategory,
} from '../actions';
import ProductFilter from './productfilter/productFilter.jsx';

class Products extends React.Component {
  componentWillMount() {
    if (this.props.products.length === 0) {
      this.props.loadProducts();
    }

    if (this.props.productCategories.length === 0) {
      this.props.loadProductCategories();
    }
  }

  render() {
    const {
      filteredProducts,
      filterProducts,
      productCategories,
      categoriesToFilter,
      toggleProductCategory,
    } = this.props;

    return (
      <div>
        <ProductFilter
          filterProducts={filterProducts}
          productCategories={productCategories}
          categoriesToFilter={categoriesToFilter}
          toggleProductCategory={toggleProductCategory}
        />
        <ProductList products={filteredProducts} />
      </div>
    );
  }
}

Products.propTypes = {
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  productCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoriesToFilter: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  filteredProducts: PropTypes.arrayOf(ProductPropType).isRequired,
  filterProducts: PropTypes.func.isRequired,
  toggleProductCategory: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    products: state.products.products,
    productCategories: state.products.productCategories,
    categoriesToFilter: state.products.categoriesToFilter,
    filteredProducts: state.products.filteredProducts,
  }),
  dispatch => ({
    loadProducts() {
      dispatch(createLoadProducts());
    },
    loadProductCategories() {
      dispatch(createLoadProductCategories());
    },
    filterProducts(filterString) {
      dispatch(createFilterProducts(filterString));
    },
    toggleProductCategory(category) {
      dispatch(createToggleFilterCategory(category));
    },
  }),
)(Products);
