import { PropTypes } from 'react';

const shoppingCart = PropTypes.arrayOf(PropTypes.shape({
  amount: PropTypes.number,
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.string),
  }),
}));

export default shoppingCart;
