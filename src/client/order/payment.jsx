import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import Xhr from '../xhr';
import { ShoppingCartPropType } from '../shoppingcart/shoppingCart.proptypes';

const styles = {
  paymentButton: {
    marginTop: '20px',
  },
};

const startOrder = shoppingCart => Xhr.post('/api/orders', shoppingCart);

const Payment = ({ email, shoppingCart, finishOrder }) => {
  const handler = StripeCheckout.configure({
    key: PAYMENT_PUBLIC,
    email,
    locale: 'auto',
    opened: () => startOrder(shoppingCart),
    token: token => Xhr.post('/api/payment', { token, shoppingCartId: shoppingCart.id })
      .then(finishOrder, () => {
        /* TODO implement error handling when payment fails */
      }),
  });

  return (
    <RaisedButton
      style={styles.paymentButton}
      onClick={() => handler.open({
        name: 'Geekplanet GmbH',
        image: '/assets/images/icon.png',
        currency: 'chf',
        amount: shoppingCart.items.reduce(
          (sum, { amount, product }) => (amount * product.price * 100) + sum,
          0
        ),
      })}
      label={<FormattedMessage id="ORDER.PAYMENT.SELECT_PAYMENT_METHOD" />}
      primary
    />
  );
};

Payment.propTypes = {
  email: PropTypes.string.isRequired,
  shoppingCart: ShoppingCartPropType.isRequired,
  finishOrder: PropTypes.func.isRequired,
};

export default Payment;