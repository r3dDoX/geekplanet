import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createFinishOrder } from '../actions';
import { CouponPropType, ShoppingCartItemsPropType } from '../propTypes';

const Summary = ({ finishOrder }) => (
  <RaisedButton
    label={<FormattedMessage id="ORDER.SUMMARY.CONFIRM_ORDER" />}
    primary
    onClick={finishOrder}
  />
);

Summary.propTypes = {
  finishOrder: PropTypes.func.isRequired,
  items: ShoppingCartItemsPropType.isRequired,
  coupons: PropTypes.arrayOf(CouponPropType).isRequired,
};

export default connect(
  (state) => ({
    items: state.shoppingCart.items,
    coupons: state.shoppingCart.coupons,
  }),
  dispatch => ({
    finishOrder() {
      dispatch(createFinishOrder());
    },
  }),
)(Summary);
