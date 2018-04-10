import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { change } from 'redux-form';
import { createLoadProductCategories, createLoadProducts, createSetFilter } from '../actions';
import MainSpinner from '../layout/mainSpinner.jsx';
import ProductList from '../products/productList.jsx';
import { ProductCategoryPropType, ProductPropType } from '../propTypes';
import NothingFound from './nothingFound.jsx';
import ProductFilter, { formName } from './productFilter.jsx';

class Products extends React.Component {
  componentWillMount() {
    if (!this.props.products.length) {
      this.props.loadProducts();
    }

    if (!this.props.productCategories.length) {
      this.props.loadProductCategories();
    }

    const query = queryString.parse(this.props.location.search);
    if (query && query.filterString) {
      this.props.updateForm(query.filterString);
    }

    this.updateFilter(
      this.props.location.search,
      this.props.productCategories,
    );
  }

  componentWillUpdate(nextProps) {
    if (this.props.location.search !== nextProps.location.search
      || this.props.productCategories.length !== nextProps.productCategories.length) {
      this.updateFilter(
        nextProps.location.search,
        nextProps.productCategories,
      );
    }
  }

  updateFilter(locationSearch, productCategories) {
    const query = queryString.parse(locationSearch);
    if ((query.categories || query.filterString) && productCategories.length) {
      const categories = query.categories ? query.categories.split(',') : [];

      this.props.setFilter(
        productCategories.filter(category => categories.includes(category._id)),
        query.filterString
      );
    } else {
      this.props.setFilter();
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
        <Helmet>
          <title>{intl.formatMessage({ id: 'COMMON.PRODUCTS' })}</title>
        </Helmet>
        <ProductFilter />
        {
          products.length
            ? filteredProducts.length
              ? <ProductList products={filteredProducts} filterShown={filterShown} />
              : <NothingFound />
            : <MainSpinner />
        }
      </div>
    );
  }
}

Products.propTypes = {
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  filteredProducts: PropTypes.arrayOf(ProductPropType).isRequired,
  filterShown: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  state => ({
    products: state.products.products,
    productCategories: state.products.productCategories,
    filteredProducts: state.products.filteredProducts,
    filterShown: state.products.filterShown,
  }),
  dispatch => ({
    loadProducts() {
      dispatch(createLoadProducts());
    },
    loadProductCategories() {
      dispatch(createLoadProductCategories());
    },
    updateForm(filterString) {
      dispatch(change(formName, 'filterString', filterString));
    },
    setFilter(productCategories, filterString) {
      dispatch(createSetFilter({
        productCategories,
        filterString,
      }));
    },
  }),
)(withRouter(injectIntl(Products)));
