import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import Xhr from '../xhr';
import { ShoppingCartPropType } from '../propTypes';
import MainSpinner from '../layout/mainSpinner.jsx';

const styles = {
  container: {
    marginTop: '20px',
  },
  paymentButton: {
    margin: '10px',
  },
};

class Payment extends React.Component {
  componentWillMount() {
    this.props.startOrder();
  }

  render() {
    const {
      email,
      shoppingCart,
      finishOrder,
      startProcessing,
      processing,
    } = this.props;

    if (processing) {
      return <MainSpinner />;
    }

    const stripeHandler = StripeCheckout.configure({
      key: PAYMENT.PUBLIC,
      email,
      locale: 'auto',
      token: (token) => {
        startProcessing();

        Xhr.post('/api/payment/cleared', { token, shoppingCartId: shoppingCart.id })
          .then(finishOrder, () => window.location.assign('/error'));
      },
    });

    return (
      <div style={styles.container}>
        {shoppingCart.total > 0 ? [
          <RaisedButton
            key="buttonCreditCard"
            style={styles.paymentButton}
            onClick={() => stripeHandler.open({
              name: 'geekplanet GmbH',
              image: '/assets/images/icon.png',
              currency: 'chf',
              amount: shoppingCart.total * 100,
            })}
            label={<FormattedMessage id="ORDER.PAYMENT.CREDIT_CARD" />}
            primary
          />,
          <RaisedButton
            key="buttonPrepayment"
            style={styles.paymentButton}
            onClick={() => {
              startProcessing();

              Xhr
                .post('/api/payment/prepayment', {
                  shoppingCartId: shoppingCart.id,
                })
                .then(finishOrder, () => () => window.location.assign('/error'));
            }}
            label={<FormattedMessage id="ORDER.PAYMENT.PREPAYMENT" />}
            primary
          />,
        ] : [
          <p key="textNoPayment">
            <FormattedMessage id="ORDER.PAYMENT.NO_PAYMENT" />
          </p>,
          <RaisedButton
            key="buttonNoPayment"
            onClick={() =>
              Xhr
                .post('/api/payment/none', {
                  shoppingCartId: shoppingCart.id,
                })
                .then(finishOrder, () => () => window.location.assign('/error'))
            }
            label={<FormattedMessage id="ORDER.PAYMENT.FINISH" />}
            primary
          />,
        ]}
      </div>
    );
  }
}

Payment.propTypes = {
  email: PropTypes.string.isRequired,
  processing: PropTypes.bool.isRequired,
  shoppingCart: ShoppingCartPropType.isRequired,
  startOrder: PropTypes.func.isRequired,
  finishOrder: PropTypes.func.isRequired,
  startProcessing: PropTypes.func.isRequired,
};

export default Payment;
