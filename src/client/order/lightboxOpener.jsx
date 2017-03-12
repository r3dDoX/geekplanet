import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';
import { ShoppingCartPropType } from '../shoppingcart/shoppingCart.proptypes';
import ActionTypes from '../actionTypes';
import Xhr from '../xhr';

const styles = {
  button: {
    marginTop: '15px',
  },
};

const LightboxOpener = ({
  shoppingCart,
  startOrder,
  removeOrder,
}, { datatrans: { openPaymentLayer } }) => {
  const startPayment = () => {
    openPaymentLayer({
      amount: shoppingCart.items.reduce(
        (sum, { amount, product }) => sum + (product.price * amount), 0
      ) * 100,
      currency: 'CHF',
      sign: SIGN,
      merchantId: MERCHANT_ID,
      refno: shoppingCart.id,
    }).catch(() => removeOrder(shoppingCart.id));

    startOrder(shoppingCart);
  };

  return (
    <RaisedButton
      style={styles.button}
      label={<FormattedMessage id="ORDER.PAYMENT.SELECT_PAYMENT_METHOD" />}
      primary
      onClick={startPayment}
    />
  );
};

LightboxOpener.contextTypes = {
  datatrans: React.PropTypes.shape({
    openPaymentLayer: React.PropTypes.func,
  }),
};

LightboxOpener.propTypes = {
  shoppingCart: ShoppingCartPropType.isRequired,
  startOrder: PropTypes.func.isRequired,
  removeOrder: PropTypes.func.isRequired,
};

export default connect(
  state => ({ shoppingCart: state.shoppingCart }),
  () => ({
    startOrder: shoppingCart => Xhr.post(
      '/api/orders',
      JSON.stringify(shoppingCart),
      'application/json'
    ),
    removeOrder: shoppingCartId => Xhr.deleteHttp(`/api/orders/${shoppingCartId}`),
  })
)(LightboxOpener);
