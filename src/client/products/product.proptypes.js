import { PropTypes } from 'react';

const product = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  stock: PropTypes.number,
  description: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.string),
});

export default product;
