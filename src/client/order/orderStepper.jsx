import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import Xhr from '../xhr';
import { ShoppingCartPropType } from '../shoppingcart/shoppingCart.proptypes';

const styles = {
  container: {
    padding: '24px',
  },
  productAvatar: {
    margin: '10px 0',
  },
  footerRow: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  amount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteButton: {
    marginRight: '8px',
  },
  itemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '8px',
  },
};

const startOrder = shoppingCart => Xhr.post(
  '/api/orders',
  JSON.stringify(shoppingCart),
  'application/json'
);
const removeOrder = shoppingCartId => Xhr.deleteHttp(`/api/orders/${shoppingCartId}`);

const OrderStepper = ({ email, shoppingCart }) => {
  const stripeConfig = {
    key: PAYMENT_PUBLIC,
    locale: 'auto',
    token: token => Xhr.post(
      '/api/payment',
      JSON.stringify({ token, shoppingCartId: shoppingCart.id }),
      'application/json'
    ),
    opened: () => startOrder(shoppingCart),
    closed: () => removeOrder(shoppingCart.id),
  };

  if (email) {
    stripeConfig.email = email;
  }

  const handler = StripeCheckout.configure(stripeConfig);

  return (
    <div style={styles.container}>
      <Stepper
        activeStep={0}
        linear={false}
        orientation="vertical"
      >
        <Step>
          <StepButton>
            <FormattedMessage id="ORDER.PAYMENT.TITLE" />
          </StepButton>
          <StepContent>
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
          </StepContent>
        </Step>
        <Step>
          <StepButton>
            <FormattedMessage id="ORDER.ADDRESS.TITLE" />
          </StepButton>
          <StepContent>
            <p>An ad group contains one or more ads which target a shared set of keywords.</p>
          </StepContent>
        </Step>
      </Stepper>
    </div>
  );
};

OrderStepper.defaultProps = {
  email: '',
};

OrderStepper.propTypes = {
  email: PropTypes.string,
  shoppingCart: ShoppingCartPropType.isRequired,
};

export default connect(
  state => ({
    email: state.auth.email,
    shoppingCart: state.shoppingCart,
  }),
  () => ({})
)(OrderStepper);
