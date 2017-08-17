import Badge from 'material-ui/Badge';
import { white } from 'material-ui/styles/colors';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createToggleShoppingCartDrawer } from '../actions';
import { ShoppingCartItemsPropType } from '../propTypes';

const ShoppingCartMenu = ({
  toggleShoppingCartDrawer,
  shoppingCartItems,
}) => {
  const itemCount = shoppingCartItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Badge
      badgeContent={itemCount}
      onClick={toggleShoppingCartDrawer}
      secondary
      style={{
        padding: '12px',
        cursor: 'pointer',
      }}
      badgeStyle={{
        top: '-2px',
        right: '-2px',
        visibility: itemCount === 0 ? 'hidden' : 'visible',
      }}
    >
      <ActionShoppingCart color={white} />
    </Badge>
  );
};

ShoppingCartMenu.propTypes = {
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
)(ShoppingCartMenu);
