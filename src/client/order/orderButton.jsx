import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import { createAddItemToShoppingCart } from '../actions';
import { ProductPropType } from '../propTypes';

const OrderButton = ({ product, addItemToShoppingCart }) => (
  <RaisedButton
    onClick={() => addItemToShoppingCart(product)}
    label={<span>&nbsp;&nbsp;&nbsp;<FormattedMessage id="COMMON.ORDER" /></span>}
    icon={<ShoppingCart />}
    primary
  />
);

OrderButton.propTypes = {
  product: ProductPropType.isRequired,
  addItemToShoppingCart: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  dispatch => ({
    addItemToShoppingCart(product) {
      dispatch(createAddItemToShoppingCart(product));
    },
  })
)(OrderButton);
