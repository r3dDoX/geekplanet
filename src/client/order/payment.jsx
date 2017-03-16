import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import Xhr from '../xhr';
import { ShoppingCartPropType } from '../shoppingcart/shoppingCart.proptypes';

const startOrder = shoppingCart => Xhr.post(
  '/api/orders',
  JSON.stringify(shoppingCart),
  'application/json'
);

const Payment = ({ email, shoppingCart, finishOrder }) => {
  const handler = StripeCheckout.configure({
    key: PAYMENT_PUBLIC,
    email,
    locale: 'auto',
    opened: () => startOrder(shoppingCart),
    token: token => Xhr.post(
      '/api/payment',
      JSON.stringify({ token, shoppingCartId: shoppingCart.id }),
      'application/json'
    )
      .then(finishOrder, () => {
        /* TODO implement error handling when payment fails */
      }),
  });

  return (
    <RaisedButton
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