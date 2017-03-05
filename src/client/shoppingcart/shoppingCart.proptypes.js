import { PropTypes } from 'react';
import productPropType from '../products/product.proptypes';

export const ShoppingCartItemPropType = PropTypes.shape({
  amount: PropTypes.number,
  product: productPropType,
});

const shoppingCart = PropTypes.arrayOf(ShoppingCartItemPropType);

export default shoppingCart;
