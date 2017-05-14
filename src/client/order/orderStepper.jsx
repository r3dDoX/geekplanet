import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import { FormattedMessage } from 'react-intl';
import { initialize } from 'redux-form';
import { ShoppingCartPropType, OrderPropType } from '../propTypes';
import AddressChooser from './addressChooser.jsx';
import UserAddress, { formName } from './userAddress.jsx';
import Payment from './payment.jsx';
import Xhr from '../xhr';
import { OrderSteps } from './order.reducer';
import {
  createFinishOrder, createLoadAddresses, createSaveAddress, createSelectAddress,
  createSelectStep,
} from '../actions';

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

class OrderStepper extends React.Component {
  componentWillMount() {
    if (this.props.shoppingCart.items.length === 0) {
      this.props.history.push('/');
    }
    this.props.loadAddresses();
  }

  render() {
    const {
      email,
      shoppingCart,
      finishOrder,
      selectAddress,
      saveAddress,
      order,
      selectStep,
    } = this.props;

    return (
      <div style={styles.container}>
        <Stepper
          activeStep={order.step}
          linear={false}
          orientation="vertical"
        >
          <Step
            onClick={() => {
              if (order.step !== OrderSteps.CONFIRMATION) {
                selectStep(OrderSteps.ADDRESS);
              }
            }}
            completed={order.step > OrderSteps.ADDRESS}
            disabled={order.step === OrderSteps.CONFIRMATION}
          >
            <StepButton>
              <FormattedMessage id="ORDER.ADDRESS.TITLE" />
            </StepButton>
            <StepContent>
              <AddressChooser
                addresses={order.addresses}
                selectedAddressId={order.selectedAddress && order.selectedAddress._id}
                selectAddress={
                  addressId => selectAddress(
                    order.addresses.find(address => address._id === addressId),
                  )
                }
              />
              <UserAddress onSubmit={saveAddress} />
            </StepContent>
          </Step>
          <Step
            completed={order.step > OrderSteps.PAYMENT}
            disabled={order.step !== OrderSteps.PAYMENT}
          >
            <StepButton>
              <FormattedMessage id="ORDER.PAYMENT.TITLE" />
            </StepButton>
            <StepContent>
              {email && <Payment
                email={email}
                shoppingCart={shoppingCart}
                startOrder={() => Xhr.put('/api/orders', Object.assign({
                  _id: shoppingCart.id,
                  address: order.selectedAddress,
                  items: shoppingCart.items,
                }))}
                finishOrder={finishOrder}
              />}
            </StepContent>
          </Step>
          <Step
            completed={order.step === OrderSteps.CONFIRMATION}
            disabled={order.step !== OrderSteps.CONFIRMATION}
          >
            <StepButton>
              <FormattedMessage id="ORDER.CONFIRMATION.TITLE" />
            </StepButton>
            <StepContent>
              <p><FormattedMessage id="ORDER.CONFIRMATION.TEXT" /></p>
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

OrderStepper.defaultProps = {
  email: '',
};

OrderStepper.propTypes = {
  email: PropTypes.string,
  shoppingCart: ShoppingCartPropType.isRequired,
  finishOrder: PropTypes.func.isRequired,
  loadAddresses: PropTypes.func.isRequired,
  selectAddress: PropTypes.func.isRequired,
  saveAddress: PropTypes.func.isRequired,
  selectStep: PropTypes.func.isRequired,
  order: OrderPropType.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(connect(
  state => ({
    email: state.auth.email,
    shoppingCart: state.shoppingCart,
    order: state.order,
  }),
  dispatch => ({
    loadAddresses() {
      dispatch(createLoadAddresses());
    },
    selectAddress: (address) => {
      dispatch(createSelectAddress(address));
      dispatch(initialize(formName, address));
    },
    saveAddress(address) {
      dispatch(createSaveAddress(address));
    },
    selectStep(step) {
      dispatch(createSelectStep(step));
    },
    finishOrder() {
      dispatch(createFinishOrder());
    },
  }),
)(OrderStepper));
