import { Step, StepButton, StepContent, Stepper } from 'material-ui/Stepper';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import { createSelectStep } from '../actions';
import { ShoppingCartPropType } from '../propTypes';
import PrivateRoute from '../router/privateRoute.jsx';
import AddressStepContent from './addressStepContent.jsx';
import AgbStepContent from './agbStepContent.jsx';
import ConfirmationStepContent from './confirmationStepContent.jsx';
import { OrderSteps } from './order.reducer';
import PaymentStepContent from './paymentStepContent.jsx';

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
    } else {
      this.navigateToCorrectStep();
    }
  }

  componentDidUpdate() {
    if (!this.props.history.location.pathname.includes(this.props.orderStep)) {
      this.navigateToCorrectStep();
    }
  }

  componentWillUnmount() {
    if (this.props.orderStep === OrderSteps.CONFIRMATION) {
      this.props.selectStep(OrderSteps.ADDRESS);
    }
  }

  navigateToCorrectStep() {
    switch (this.props.orderStep) {
      default:
        this.props.history.push(`${this.props.match.url}/address`);
        break;
      case OrderSteps.AGB:
        this.props.history.push(`${this.props.match.url}/agb`);
        break;
      case OrderSteps.PAYMENT:
        this.props.history.push(`${this.props.match.url}/payment`);
        break;
      case OrderSteps.CONFIRMATION:
        this.props.history.push(`${this.props.match.url}/confirmation`);
        break;
    }
  }

  render() {
    const {
      match,
      orderStep,
      selectStep,
    } = this.props;

    return [
      <FormattedMessage key="orderTitle" id="COMMON.ORDER">
        {message => (<Helmet><title>{message}</title></Helmet>)}
      </FormattedMessage>,
      <Stepper
        key="orderStepper"
        linear={false}
        orientation="vertical"
        style={styles.container}
      >
        <Step
          completed={orderStep !== OrderSteps.ADDRESS}
          disabled={orderStep === OrderSteps.CONFIRMATION}
          active={orderStep === OrderSteps.ADDRESS}
        >
          <StepButton
            onClick={() => orderStep !== OrderSteps.CONFIRMATION && selectStep(OrderSteps.ADDRESS)}
          >
            <FormattedMessage id="ORDER.ADDRESS.TITLE" />
          </StepButton>
          <StepContent>
            <PrivateRoute
              path={`${match.url}/${OrderSteps.ADDRESS}`}
              component={AddressStepContent}
            />
          </StepContent>
        </Step>
        <Step
          completed={orderStep !== OrderSteps.ADDRESS && orderStep !== OrderSteps.AGB}
          disabled={orderStep === OrderSteps.CONFIRMATION}
          active={orderStep === OrderSteps.AGB}
        >
          <StepButton
            onClick={() => orderStep !== OrderSteps.CONFIRMATION && selectStep(OrderSteps.AGB)}
          >
            <FormattedMessage id="ORDER.AGB.TITLE" />
          </StepButton>
          <StepContent>
            <PrivateRoute path={`${match.url}/${OrderSteps.AGB}`} component={AgbStepContent} />
          </StepContent>
        </Step>
        <Step
          completed={orderStep === OrderSteps.CONFIRMATION}
          disabled={orderStep !== OrderSteps.PAYMENT}
          active={orderStep === OrderSteps.PAYMENT}
        >
          <StepButton>
            <FormattedMessage id="ORDER.PAYMENT.TITLE" />
          </StepButton>
          <StepContent>
            <PrivateRoute
              path={`${match.url}/${OrderSteps.PAYMENT}`}
              component={PaymentStepContent}
            />
          </StepContent>
        </Step>
        <Step
          completed={orderStep === OrderSteps.CONFIRMATION}
          disabled={orderStep !== OrderSteps.CONFIRMATION}
          active={orderStep === OrderSteps.CONFIRMATION}
        >
          <StepButton>
            <FormattedMessage id="ORDER.CONFIRMATION.TITLE" />
          </StepButton>
          <StepContent>
            <PrivateRoute
              path={`${match.url}/${OrderSteps.CONFIRMATION}`}
              component={ConfirmationStepContent}
            />
          </StepContent>
        </Step>
      </Stepper>,
    ];
  }
}

OrderStepper.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  shoppingCart: ShoppingCartPropType.isRequired,
  orderStep: PropTypes.string.isRequired,
  selectStep: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(connect(
  state => ({
    shoppingCart: state.shoppingCart,
    orderStep: state.order.step,
  }),
  dispatch => ({
    selectStep(step) {
      dispatch(createSelectStep(step));
    },
  }),
)(OrderStepper));
