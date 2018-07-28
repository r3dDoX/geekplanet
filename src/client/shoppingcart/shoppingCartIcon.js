import Badge from '@material-ui/core/Badge';
import common from '@material-ui/core/colors/common';
import { withStyles } from '@material-ui/core/styles';
import ActionShoppingCart from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createToggleShoppingCartDrawer } from '../actions';
import { ShoppingCartItemsPropType } from '../propTypes';

const { white } = common;

const styles = theme => ({
  root: {
    cursor: 'pointer',
    margin: theme.spacing.unit * 2,
  },
  badgeHidden: {
    visibility: 'hidden',
  },
  badgeVisible: {
    visibility: 'visible',
  },
});

const ShoppingCartMenu = ({
  toggleShoppingCartDrawer,
  shoppingCartItems,
  classes,
}) => {
  const itemCount = shoppingCartItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Badge
      classes={{
        root: classes.root,
        badge: itemCount === 0 ? classes.badgeHidden : classes.badgeVisible,
      }}
      badgeContent={itemCount}
      onClick={toggleShoppingCartDrawer}
      color="secondary"
    >
      <ActionShoppingCart nativeColor={white} />
    </Badge>
  );
};

ShoppingCartMenu.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shoppingCartItems: ShoppingCartItemsPropType.isRequired,
  toggleShoppingCartDrawer: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    shoppingCartItems: state.shoppingCart.items,
  }),
  dispatch => ({
    toggleShoppingCartDrawer() {
      dispatch(createToggleShoppingCartDrawer());
    },
  }),
)(withStyles(styles)(ShoppingCartMenu));
