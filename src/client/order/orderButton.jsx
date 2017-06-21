import React from 'react';
import { RaisedButton } from 'material-ui';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';


const OrderButton = ({ onClick }) => (
  <RaisedButton
    onClick={onClick}
    label={<span>&nbsp;&nbsp;&nbsp;<FormattedMessage id="COMMON.ORDER" /></span>}
    icon={<ShoppingCart />}
    primary
  />
);

OrderButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default OrderButton;
