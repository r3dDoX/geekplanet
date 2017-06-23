import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductTile from './productTile.jsx';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    padding: '20px 10px',
  },
};

const ProductList = ({ locale, products }) => (
  <div style={styles.container}>
    {products.map(product => (
      <ProductTile
        key={product._id}
        locale={locale}
        product={product}
      />
    ))}
  </div>
);

ProductList.propTypes = {
  locale: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

export default connect(
  state => ({
    locale: state.i18n.locale,
  })
)(ProductList);
