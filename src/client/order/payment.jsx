import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import Xhr from '../xhr';
import { ShoppingCartPropType } from '../shoppingcart/shoppingCart.proptypes';

const styles = {
  container: {
    marginTop: '20px',
  },
  paymentButton: {
    margin: '0 5px',
  },
};

class Payment extends React.Component {
  componentWillMount() {
    this.props.startOrder();
  }

  render() {
    const { email, shoppingCart, finishOrder } = this.props;

    const stripeHandler = StripeCheckout.configure({
      key: process.env.PAYMENT_PUBLIC,
      email,
      locale: 'auto',
      token: token => Xhr.post('/api/payment/cleared', { token, shoppingCartId: shoppingCart.id })
        .then(finishOrder, () => { /* TODO implement error handling when payment fails */ }),
    });

    return (
      <div style={styles.container}>
        <RaisedButton
          style={styles.paymentButton}
          onClick={() => stripeHandler.open({
            name: 'geekplanet GmbH',
            image: '/assets/images/icon.png',
            currency: 'chf',
            amount: shoppingCart.items.reduce(
              (sum, { amount, product }) => (amount * product.price * 100) + sum,
              0
            ),
          })}
          label={<FormattedMessage id="ORDER.PAYMENT.CREDIT_CARD" />}
          primary
        />
        <RaisedButton
          style={styles.paymentButton}
          onClick={() => Xhr.post('/api/payment/prepayment', { shoppingCartId: shoppingCart.id })
            .then(finishOrder, () => {
              /* TODO implement error handling when order not updated */
            })}
          label={<FormattedMessage id="ORDER.PAYMENT.PREPAYMENT" />}
          primary
        />
      </div>
    );
  }
}

Payment.propTypes = {
  email: PropTypes.string.isRequired,
  shoppingCart: ShoppingCartPropType.isRequired,
  startOrder: PropTypes.func.isRequired,
  finishOrder: PropTypes.func.isRequired,
};

export default Payment;
