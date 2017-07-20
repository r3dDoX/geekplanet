import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-virtual-list';
import ProductTile from './productTile.jsx';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    padding: '20px 10px',
  },
};

const ProductList = ({ virtual }) => (
  <div style={styles.container}>
    {virtual.items.map(product => (
      <ProductTile
        key={product._id}
        product={product}
      />
    ))}
  </div>
);

ProductList.propTypes = {
  virtual: {
    items: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      files: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
  }.isRequired,
};

export default VirtualList()(ProductList);
