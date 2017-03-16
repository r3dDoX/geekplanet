import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import { FormattedMessage } from 'react-intl';
import { ShoppingCartPropType } from '../shoppingcart/shoppingCart.proptypes';
import ActionTypes from '../actionTypes';
import UserAddress from './userAddress.jsx';
import Payment from './payment.jsx';

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

const OrderStepper = ({ email, shoppingCart, finishOrder }) => (
  <div style={styles.container}>
    <Stepper
      activeStep={0}
      linear={false}
      orientation="vertical"
    >
      <Step>
        <StepButton>
          <FormattedMessage id="ORDER.ADDRESS.TITLE" />
        </StepButton>
        <StepContent>
          <UserAddress />
        </StepContent>
      </Step>
      <Step>
        <StepButton>
          <FormattedMessage id="ORDER.PAYMENT.TITLE" />
        </StepButton>
        <StepContent>
          {email && <Payment
            email={email}
            shoppingCart={shoppingCart}
            finishOrder={finishOrder}
          />}
        </StepContent>
      </Step>
    </Stepper>
  </div>
);

OrderStepper.defaultProps = {
  email: '',
};

OrderStepper.propTypes = {
  email: PropTypes.string,
  shoppingCart: ShoppingCartPropType.isRequired,
  finishOrder: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    email: state.auth.email,
    shoppingCart: state.shoppingCart,
  }),
  dispatch => ({
    finishOrder: () => dispatch({
      type: ActionTypes.ORDER_FINISHED,
    }),
  })
)(OrderStepper);
