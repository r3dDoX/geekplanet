import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import red from '@material-ui/core/colors/red';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import InvoiceIcon from '@material-ui/icons/Receipt';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { ShoppingCartPropType } from '../propTypes';
import { accent1Color } from '../theme';
import Xhr from '../xhr';

const redA100 = red.A100;

const Container = styled.div`
  margin-top: 20px;
`;

const PaymentButton = styled(Button)`
  margin: 10px !important;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${accent1Color} !important;
  color: #FFF !important;
`;

const StyledChip = styled(Chip)`
  margin: 10px;
  background-color: ${redA100} !important;
`;

const styles = {
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
      paymentError,
      stopProcessing,
    } = this.props;

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
      <Container>
        {paymentError && [
          <StyledChip
            key="creditCardError"
            avatar={
              <StyledAvatar>
                <CreditCardIcon />
              </StyledAvatar>
            }
            label={paymentError}
          />,
          <br key="creditCardErrorBreak" />,
        ]}
        {shoppingCart.total > 0 ? [
          <PaymentButton
            variant="contained"
            key="buttonCreditCard"
            style={styles.paymentButton}
            onClick={() => stripeHandler.open({
              name: 'geekplanet GmbH',
              image: '/assets/images/icon.png',
              currency: 'chf',
              amount: shoppingCart.total * 100,
            })}
          >
            <CreditCardIcon />
            &nbsp;&nbsp;
            <FormattedMessage id="ORDER.PAYMENT.CREDIT_CARD" />
          </PaymentButton>,
          <PaymentButton
            variant="contained"
            key="buttonPrepayment"
            onClick={() => {
              startProcessing();

              Xhr
                .post(`/api/orders/${shoppingCart.id}/paymentMethod/prepayment`)
                .then(finishPaymentStep, () => () => window.location.assign('/error'));
            }}
          >
            <InvoiceIcon />
            &nbsp;&nbsp;
            <FormattedMessage id="ORDER.PAYMENT.PREPAYMENT" />
          </PaymentButton>,
        ] : [
          <p key="textNoPayment">
            <FormattedMessage id="ORDER.PAYMENT.NO_PAYMENT" />
          </p>,
          <Button
            variant="contained"
            key="buttonNoPayment"
            onClick={() =>
              Xhr
                .post(`/api/orders/${shoppingCart.id}/paymentMethod/none`)
                .then(finishPaymentStep, () => () => window.location.assign('/error'))
            }
            label={<FormattedMessage id="ORDER.PAYMENT.FINISH" />}
            color="primary"
          />,
        ]}
      </Container>
    );
  }
}

Payment.propTypes = {
  email: PropTypes.string.isRequired,
  shoppingCart: ShoppingCartPropType.isRequired,
  startOrder: PropTypes.func.isRequired,
  finishPaymentStep: PropTypes.func.isRequired,
  startProcessing: PropTypes.func.isRequired,
  stopProcessing: PropTypes.func.isRequired,
  paymentError: PropTypes.string.isRequired,
};

export default Payment;
