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
import Xhr from '../xhr';

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

const OrderStepper = ({ email, shoppingCart, finishOrder, saveAddress, order }) => (
  <div style={styles.container}>
    <Stepper
      activeStep={order.step}
      linear={false}
      orientation="vertical"
    >
      <Step>
        <StepButton>
          <FormattedMessage id="ORDER.ADDRESS.TITLE" />
        </StepButton>
        <StepContent>
          <UserAddress onSubmit={saveAddress} />
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
      <Step>
        <StepButton>
          <FormattedMessage id="ORDER.CONFIRMATION.TITLE" />
        </StepButton>
        <StepContent>
          <p>Bestätigung</p>
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
  saveAddress: PropTypes.func.isRequired,
  order: PropTypes.shape({
    step: PropTypes.number.isRequired,
  }).isRequired,
}
;

export default connect(
  state => ({
    email: state.auth.email,
    shoppingCart: state.shoppingCart,
    order: state.order,
  }),
  dispatch => ({
    saveAddress: address => Xhr.post(
      '/api/userAddress',
      JSON.stringify(address),
      'application/json'
    )
      .then(addressId => dispatch({
        type: ActionTypes.SAVE_ADDRESS,
        data: addressId,
      })),
    finishOrder: () => dispatch({
      type: ActionTypes.ORDER_FINISHED,
    }),
  })
)(OrderStepper);
