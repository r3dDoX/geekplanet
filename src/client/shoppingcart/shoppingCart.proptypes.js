import PropTypes from 'prop-types';
import productPropType from '../products/product.proptypes';

export const ShoppingCartItemPropType = PropTypes.shape({
  amount: PropTypes.number,
  product: productPropType,
});

export const ShoppingCartItemsPropType = PropTypes.arrayOf(ShoppingCartItemPropType);

export const ShoppingCartPropType = PropTypes.shape({
  id: PropTypes.string,
  items: ShoppingCartItemsPropType,
});

export default ShoppingCartPropType;
