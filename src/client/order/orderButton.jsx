import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import ShoppingCart from '@material-ui/icons/AddShoppingCart';
import { createAddItemToShoppingCart } from '../actions';
import { ProductPropType } from '../propTypes';

const OrderButton = ({ product, addItemToShoppingCart }) => (
  <Button
    variant="contained"
    onClick={() => addItemToShoppingCart(product)}
    label={
      <span>
        <FormattedMessage id="COMMON.ADD" />
      </span>
    }
    icon={<ShoppingCart />}
    color="primary"
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
