import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import { redA100 } from 'material-ui/styles/colors';
import CreditCardIcon from 'material-ui/svg-icons/action/credit-card';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import MainSpinner from '../layout/mainSpinner.jsx';
import { ShoppingCartPropType } from '../propTypes';
import { accent1Color } from '../theme';
import Xhr from '../xhr';

const styles = {
  container: {
    marginTop: '20px',
  },
  paymentButton: {
    margin: '10px',
  },
  paymentError: {
    margin: '0 0 10px 10px',
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
      finishPaymentStep,
      startProcessing,
      processing,
      paymentError,
      stopProcessing,
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

        Xhr.post(`/api/orders/${shoppingCart.id}/paymentMethod/credit_card`, { token })
          .then(finishPaymentStep)
          .catch(stopProcessing);
      },
    });

    return (
      <div style={styles.container}>
        {paymentError && (
          <Chip backgroundColor={redA100} style={styles.paymentError}>
            <Avatar size={32} backgroundColor={accent1Color} icon={<CreditCardIcon />} />
            {paymentError}
          </Chip>
        )}
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
                .post(`/api/orders/${shoppingCart.id}/paymentMethod/prepayment`)
                .then(finishPaymentStep, () => () => window.location.assign('/error'));
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
                .post(`/api/orders/${shoppingCart.id}/paymentMethod/none`)
                .then(finishPaymentStep, () => () => window.location.assign('/error'))
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
  finishPaymentStep: PropTypes.func.isRequired,
  startProcessing: PropTypes.func.isRequired,
  stopProcessing: PropTypes.func.isRequired,
  paymentError: PropTypes.string.isRequired,
};

export default Payment;
