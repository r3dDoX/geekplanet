import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import grey from '@material-ui/core/colors/grey';
import ListSubheader from '@material-ui/core/ListSubheader';
import NavigationClose from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import { formatPriceWithCurrency } from '../../common/priceFormatter';
import {
  createAddCouponToShoppingCart, createRemoveCouponFromShoppingCart, createSetShoppingCartamount,
  createToggleShoppingCartDrawer,
} from '../actions';
import { CouponPropType, ShoppingCartItemsPropType } from '../propTypes';
import { accent1Color } from '../theme';
import xhr from '../xhr';
import Coupons from './coupons.jsx';
import ShoppingCartItem from './shoppingCartItem.jsx';

const grey900 = grey['900'];

const ShippingCost = styled(MenuItem)`
  color: ${grey900} !important;
`;

const Total = styled(MenuItem)`
  color: ${accent1Color} !important;
`;

const ShoppingCartDrawer = ({
  shoppingCart,
  setAmount,
  locale,
  toggleDrawer,
  shoppingCartDrawerOpened,
  hasShippingCosts,
  shoppingCartTotal,
  coupons,
  addCouponToShoppingCart,
  removeCouponIdFromShoppingCart,
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
      onLeftIconButtonClick={toggleDrawer}
      iconElementLeft={
        <IconButton>
          <NavigationClose />
        </IconButton>
      }
    />
    {shoppingCart.length ? (
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
    ) : (
      <ListSubheader inset>
        <FormattedMessage id="SHOPPING_CART.NO_ITEMS" />
      </ListSubheader>
    )}
    {hasShippingCosts && [
      <Divider key="shippingCostDivider" />,
      <ListSubheader key="shippingCostHeader" inset>
        <FormattedMessage
          id="SHOPPING_CART.SHIPPING_COST"
          values={{ amount: formatPriceWithCurrency(ORDER.MIN_PRICE_SHIPPING) }}
        />
      </ListSubheader>,
      <ShippingCost
        key="shippingCostBody"
        disabled
        insetChildren
        primaryText={formatPriceWithCurrency(ORDER.SHIPPING_COST)}
      />,
    ]}
    <Coupons
      coupons={coupons}
      onAdd={(couponId) => {
        const checkCoupon = xhr.get(`/api/coupons/${couponId}`);
        checkCoupon.then(coupon => addCouponToShoppingCart(coupon));
        return checkCoupon;
      }}
      onRemove={removeCouponIdFromShoppingCart}
    />
    <Divider />
    <ListSubheader inset>
      <FormattedMessage id="SHOPPING_CART.TOTAL" />
    </ListSubheader>
    <Total
      disabled
      insetChildren
      primaryText={formatPriceWithCurrency(shoppingCartTotal)}
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
  coupons: PropTypes.arrayOf(CouponPropType).isRequired,
  shoppingCartDrawerOpened: PropTypes.bool.isRequired,
  setAmount: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  hasShippingCosts: PropTypes.bool.isRequired,
  shoppingCartTotal: PropTypes.number.isRequired,
  addCouponToShoppingCart: PropTypes.func.isRequired,
  removeCouponIdFromShoppingCart: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    locale: state.i18n.locale,
    shoppingCart: state.shoppingCart.items,
    coupons: state.shoppingCart.coupons,
    shoppingCartDrawerOpened: state.layout.shoppingCartDrawerOpened,
    hasShippingCosts: state.shoppingCart.hasShippingCosts,
    shoppingCartTotal: state.shoppingCart.total,
  }),
  dispatch => ({
    setAmount(amount, product) {
      dispatch(createSetShoppingCartamount(amount, product));
    },
    toggleDrawer() {
      dispatch(createToggleShoppingCartDrawer());
    },
    addCouponToShoppingCart(coupon) {
      dispatch(createAddCouponToShoppingCart(coupon));
    },
    removeCouponIdFromShoppingCart(couponId) {
      dispatch(createRemoveCouponFromShoppingCart(couponId));
    },
  }),
)(ShoppingCartDrawer);
