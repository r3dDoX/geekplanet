import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ShoppingCartPropType,
  OrderPropType,
} from '../propTypes';
import Xhr from '../xhr';
import Payment from './payment.jsx';
import { createFinishOrder, createProcessingStarted } from '../actions';

const PaymentStepContent = ({
  email,
  order,
  shoppingCart,
  finishOrder,
  startProcessing,
}) => {
  if (email) {
    return (
      <Payment
        email={email}
        processing={order.processing}
        shoppingCart={shoppingCart}
        startOrder={() => Xhr.put('/api/orders', Object.assign({
          _id: shoppingCart.id,
          address: order.selectedAddress,
          items: shoppingCart.items,
        }))}
        finishOrder={finishOrder}
        startProcessing={startProcessing}
      />
    );
  }
  return null;
};

PaymentStepContent.defaultProps = {
  email: '',
};

PaymentStepContent.propTypes = {
  email: PropTypes.string,
  shoppingCart: ShoppingCartPropType.isRequired,
  finishOrder: PropTypes.func.isRequired,
  startProcessing: PropTypes.func.isRequired,
  order: OrderPropType.isRequired,
};

export default connect(
  state => ({
    email: state.auth.email,
    shoppingCart: state.shoppingCart,
    order: state.order,
  }),
  dispatch => ({
    startProcessing() {
      dispatch(createProcessingStarted());
    },
    finishOrder() {
      dispatch(createFinishOrder());
    },
  }),
)(PaymentStepContent);
