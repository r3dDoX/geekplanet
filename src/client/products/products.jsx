import PropTypes from 'prop-types';
import React from 'react';
import DocumentTitle from 'react-document-title';
import { injectIntl } from 'react-intl';
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
    const {
      products,
      filteredProducts,
      filterShown,
      intl,
    } = this.props;

    return (
      <div>
        <DocumentTitle title={intl.formatMessage({ id: 'COMMON.PRODUCTS' })} />
        <ProductFilter />
        {products.length ? (
          <ProductList
            products={filteredProducts}
            filterShown={filterShown}
          />
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
  filterShown: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(
  state => ({
    products: state.products.products,
    filteredProducts: state.products.filteredProducts,
    filterShown: state.products.filterShown,
  }),
  dispatch => ({
    loadProducts() {
      dispatch(createLoadProducts());
    },
  }),
)(injectIntl(Products));
