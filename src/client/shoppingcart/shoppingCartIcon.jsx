import IconButton from 'material-ui/IconButton';
import { white } from 'material-ui/styles/colors';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createToggleShoppingCartDrawer } from '../actions';

const ShoppingCartMenu = ({
  toggleShoppingCartDrawer,
}) => (
  <IconButton onClick={toggleShoppingCartDrawer}>
    <ActionShoppingCart color={white} />
  </IconButton>
);

ShoppingCartMenu.propTypes = {
  toggleShoppingCartDrawer: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  dispatch => ({
    toggleShoppingCartDrawer() {
      dispatch(createToggleShoppingCartDrawer());
    },
  }),
)(ShoppingCartMenu);
