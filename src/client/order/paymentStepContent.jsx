import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ShoppingCartPropType,
  OrderStatePropType,
} from '../propTypes';
import Xhr from '../xhr';
import Payment from './payment.jsx';
import { createFinishPaymentStep, createPaymentError, createProcessingStarted } from '../actions';

const PaymentStepContent = ({
  email,
  order,
  shoppingCart,
  finishPaymentStep,
  startProcessing,
  stopProcessing,
}) => {
  if (email) {
    return (
      <Payment
        email={email}
        processing={order.processing}
        shoppingCart={shoppingCart}
        startOrder={() => Xhr.put('/api/orders', Object.assign({
          address: order.selectedAddress,
          ...shoppingCart,
        }))}
        finishPaymentStep={finishPaymentStep}
        startProcessing={startProcessing}
        stopProcessing={stopProcessing}
        paymentError={order.paymentError}
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
  finishPaymentStep: PropTypes.func.isRequired,
  startProcessing: PropTypes.func.isRequired,
  stopProcessing: PropTypes.func.isRequired,
  order: OrderStatePropType.isRequired,
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
    finishPaymentStep() {
      dispatch(createFinishPaymentStep());
    },
    stopProcessing(error) {
      dispatch(createPaymentError(error));
    },
  }),
)(PaymentStepContent);
