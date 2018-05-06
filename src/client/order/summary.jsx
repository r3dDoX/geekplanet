import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createFinishOrder } from '../actions';
import { CouponPropType, ShoppingCartItemsPropType } from '../propTypes';

const SummaryContainer = styled.div`
  margin-top: 20px;
`;

const Summary = ({
  orderId,
  items,
  coupons,
  finishOrder,
}) => [
  <SummaryContainer key="orderSummary">
    {items.map(item => <p key={item.product._id}>{item.product.de.name}</p>)}
    {coupons.map(coupon => <p key={coupon._id}>{coupon._id}</p>)}
  </SummaryContainer>,
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
