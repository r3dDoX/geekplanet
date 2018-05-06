import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createFinishOrder } from '../actions';
import { CouponPropType, ShoppingCartItemsPropType } from '../propTypes';

const Summary = ({
  orderId,
  items,
  coupons,
  finishOrder,
}) => [
  <div key="orderSummary">
    {items.map(item => <p>{item.product.de.name}</p>)}
    {coupons.map(coupon => <p>{coupon._id}</p>)}
  </div>,
  <RaisedButton
    key="finishOrderButton"
    label={<FormattedMessage id="ORDER.SUMMARY.CONFIRM_ORDER" />}
    primary
    onClick={() => finishOrder(orderId)}
  />,
];

Summary.propTypes = {
  finishOrder: PropTypes.func.isRequired,
  items: ShoppingCartItemsPropType.isRequired,
  coupons: PropTypes.arrayOf(CouponPropType).isRequired,
  orderId: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    items: state.shoppingCart.items,
    coupons: state.shoppingCart.coupons,
    orderId: state.shoppingCart.id,
  }),
  dispatch => ({
    finishOrder(orderId) {
      dispatch(createFinishOrder(orderId));
    },
  }),
)(Summary);
