import { PropTypes } from 'react';
import productPropType from '../products/product.proptypes';

const shoppingCart = PropTypes.arrayOf(PropTypes.shape({
  amount: PropTypes.number,
  product: productPropType,
}));

export default shoppingCart;
