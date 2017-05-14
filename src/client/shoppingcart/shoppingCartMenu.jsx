import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { white } from 'material-ui/styles/colors';
import ShoppingCartItem from './shoppingCartItem.jsx';
import formatPrice from '../products/priceFormatter';
import { ShoppingCartItemsPropType } from '../propTypes';
import { createSetShoppingCartamount } from '../actions';

const ShoppingCartMenu = ({
  shoppingCart,
  setAmount,
  locale,
}) => (
  <IconMenu
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    iconButtonElement={
      <IconButton>
        <ActionShoppingCart color={white} />
      </IconButton>
    }
    width={320}
  >
    <Subheader inset>
      <FormattedMessage id="SHOPPING_CART.PRODUCTS" />
    </Subheader>
    {shoppingCart.map(item => <ShoppingCartItem
      key={item.product._id}
      shoppingCartItem={item}
      setAmount={setAmount}
      locale={locale}
    />)}
    <Divider />
    <Subheader inset>
      <FormattedMessage id="SHOPPING_CART.TOTAL" />
    </Subheader>
    <ListItem
      disabled
      insetChildren
      primaryText={
        formatPrice(
          shoppingCart.reduce(
            (sum, { amount, product }) => sum + (product.price * amount),
            0
          )
        )
      }
    />
    <Divider />
    <ListItem
      insetChildren
      disabled={shoppingCart.length === 0}
      containerElement={
        <Link to="/order">
          <FormattedMessage id="SHOPPING_CART.TITLE" />
        </Link>
      }
      primaryText={
        <FormattedMessage id="SHOPPING_CART.CHECKOUT" />
      }
    />
  </IconMenu>
);

ShoppingCartMenu.propTypes = {
  shoppingCart: ShoppingCartItemsPropType.isRequired,
  setAmount: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    locale: state.i18n.locale,
    shoppingCart: state.shoppingCart.items,
  }),
  dispatch => ({
    setAmount(amount, product) {
      dispatch(createSetShoppingCartamount(amount, product));
    },
  })
)(ShoppingCartMenu);
