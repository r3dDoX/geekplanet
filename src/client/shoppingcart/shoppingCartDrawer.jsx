import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText/index';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import { formatPriceWithCurrency } from '../../common/priceFormatter';
import {
  createAddCouponToShoppingCart,
  createRemoveCouponFromShoppingCart,
  createSetShoppingCartamount,
  createToggleShoppingCartDrawer,
} from '../actions';
import { CouponPropType, ShoppingCartItemsPropType } from '../propTypes';
import { accent1Color } from '../theme';
import xhr from '../xhr';
import Coupons from './coupons.jsx';
import ShoppingCartItem from './shoppingCartItem.jsx';

const Total = styled(ListItem)`
  span {
    color: ${accent1Color} !important;
  }
`;

const styles = () => ({
  drawerPaper: {
    width: '350px',
  },
});

const ShoppingCartDrawer = ({
  classes,
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
    anchor="right"
    variant="temporary"
    open={shoppingCartDrawerOpened}
    onClose={toggleDrawer}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <List>
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu" onClick={toggleDrawer}>
          <ChevronRightIcon />
        </IconButton>
        <Typography variant="title">
          <FormattedMessage id="SHOPPING_CART.TITLE" />
        </Typography>
      </Toolbar>
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
        <ListItem key="shippingCostBody">
          <ListItemText inset primary={formatPriceWithCurrency(ORDER.SHIPPING_COST)} />
        </ListItem>,
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
      <Total>
        <ListItemText inset primary={formatPriceWithCurrency(shoppingCartTotal)} />
      </Total>
      <Divider />
      <ListItem
        button
        disabled={shoppingCart.length === 0}
        component={Link}
        to="/order"
        onClick={toggleDrawer}
      >
        <ListItemText inset primary={<FormattedMessage id="SHOPPING_CART.CHECKOUT" />} />
      </ListItem>
    </List>
  </Drawer>
);

ShoppingCartDrawer.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
)(withStyles(styles)(ShoppingCartDrawer));
