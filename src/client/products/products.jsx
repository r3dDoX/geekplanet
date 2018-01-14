import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createLoadProductCategories, createLoadProducts, createSetFilter } from '../actions';
import MainSpinner from '../layout/mainSpinner.jsx';
import ProductList from '../products/productList.jsx';
import { ProducerPropType, ProductCategoryPropType, ProductPropType } from '../propTypes';
import ProductFilter from './productfilter/productFilter.jsx';

class Products extends React.Component {
  componentWillMount() {
    if (!this.props.products.length) {
      this.props.loadProducts();
    }
    if (!this.props.productCategories.length) {
      this.props.loadProductCategories();
    }
    this.updateFilter(
      this.props.location.search,
      this.props.productCategories,
      this.props.producers
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search
      || this.props.productCategories.length !== nextProps.productCategories.length
      || this.props.producers.length !== nextProps.producers.length) {
      this.updateFilter(
        nextProps.location.search,
        nextProps.productCategories,
        nextProps.producers
      );
    }
  }

  updateFilter(locationSearch, productCategories, producers) {
    const query = queryString.parse(locationSearch);
    if ((query.categories || query.producers) && productCategories.length) {
      const categories = query.categories ? query.categories.split(',') : [];
      const queryProducers = query.producers ? query.producers.split(',') : [];

      this.props.setFilter(
        productCategories.filter(category => categories.includes(category._id)),
        producers.filter(producer => queryProducers.includes(producer._id))
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
  producers: PropTypes.arrayOf(ProducerPropType).isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
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
    producers: state.products.producers,
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
    setFilter(productCategories, producers) {
      dispatch(createSetFilter({
        productCategories,
        producers,
      }));
    },
  }),
)(withRouter(injectIntl(Products)));
