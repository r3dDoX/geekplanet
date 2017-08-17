import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatPriceWithCurrency } from '../../common/priceFormatter';
import { createSetShoppingCartamount, createToggleShoppingCartDrawer } from '../actions';
import { ShoppingCartItemsPropType } from '../propTypes';
import ShoppingCartItem from './shoppingCartItem.jsx';

const ShoppingCartDrawer = ({
  shoppingCart,
  setAmount,
  locale,
  toggleDrawer,
  shoppingCartDrawerOpened,
}) => (
  <Drawer
    open={shoppingCartDrawerOpened}
    onRequestChange={toggleDrawer}
    disableSwipeToOpen
    openSecondary
    width={350}
  >
    <AppBar
      title={<FormattedMessage id="SHOPPING_CART.TITLE" />}
      onLeftIconButtonTouchTap={toggleDrawer}
      iconElementLeft={<IconButton><NavigationClose /></IconButton>}
    />
    <List>
      {shoppingCart.map(item => (
        <ShoppingCartItem
          key={item.product._id}
          shoppingCartItem={item}
          setAmount={setAmount}
          locale={locale}
        />
      ))}
    </List>
    <Divider />
    <Subheader inset>
      <FormattedMessage id="SHOPPING_CART.TOTAL" />
    </Subheader>
    <MenuItem
      disabled
      insetChildren
      primaryText={
        formatPriceWithCurrency(
          shoppingCart.reduce(
            (sum, { amount, product }) => sum + (product.price * amount),
            0,
          ),
        )
      }
    />
    <Divider />
    <MenuItem
      insetChildren
      disabled={shoppingCart.length === 0}
      containerElement={
        <Link to="/order">
          <FormattedMessage id="SHOPPING_CART.CHECKOUT" />
        </Link>
      }
      primaryText={
        <FormattedMessage id="SHOPPING_CART.CHECKOUT" />
      }
      onClick={toggleDrawer}
    />
  </Drawer>
);

ShoppingCartDrawer.propTypes = {
  shoppingCart: ShoppingCartItemsPropType.isRequired,
  shoppingCartDrawerOpened: PropTypes.bool.isRequired,
  setAmount: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    locale: state.i18n.locale,
    shoppingCart: state.shoppingCart.items,
    shoppingCartDrawerOpened: state.layout.shoppingCartDrawerOpened,
  }),
  dispatch => ({
    setAmount(amount, product) {
      dispatch(createSetShoppingCartamount(amount, product));
    },
    toggleDrawer() {
      dispatch(createToggleShoppingCartDrawer());
    },
  }),
)(ShoppingCartDrawer);
