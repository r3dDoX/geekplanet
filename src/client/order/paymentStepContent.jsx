import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ShoppingCartPropType,
  OrderPropType,
} from '../propTypes';
import Xhr from '../xhr';
import Payment from './payment.jsx';
import { createFinishOrder } from '../actions';

const PaymentStepContent = ({
  email,
  order,
  shoppingCart,
  finishOrder,
}) => {
  if (email) {
    return (
      <Payment
        email={email}
        shoppingCart={shoppingCart}
        startOrder={() => Xhr.put('/api/orders', Object.assign({
          _id: shoppingCart.id,
          address: order.selectedAddress,
          items: shoppingCart.items,
        }))}
        finishOrder={finishOrder}
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
  order: OrderPropType.isRequired,
};

export default connect(
  state => ({
    email: state.auth.email,
    shoppingCart: state.shoppingCart,
    order: state.order,
  }),
  dispatch => ({
    finishOrder() {
      dispatch(createFinishOrder());
    },
  }),
)(PaymentStepContent);
