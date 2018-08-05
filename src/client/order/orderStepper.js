import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepContent from '@material-ui/core/StepContent';
import Stepper from '@material-ui/core/Stepper';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import styled from 'styled-components';
import { createSelectStep } from '../actions';
import { ShoppingCartPropType } from '../propTypes';
import PrivateRoute from '../router/privateRoute';
import AddressStepContent from './addressStepContent';
import AgbStepContent from './agbStepContent';
import ConfirmationText from './confirmationText';
import OrderSteps from './orderSteps';
import PaymentStepContent from './paymentStepContent';
import StepSpinner from './stepSpinner';
import Summary from './summary';

const StyledStepContent = styled(StepContent)`
  position: relative;
`;

class OrderStepper extends React.Component {
  componentWillMount() {
    if (this.props.shoppingCart.items.length === 0) {
      this.props.history.push('/');
    } else {
      this.navigateToCorrectStep();
    }
  }

  componentDidUpdate() {
    const orderStepName = OrderSteps.getLowerCaseNameByNumber(this.props.orderStep);

    if (!this.props.history.location.pathname.includes(orderStepName)) {
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
      case OrderSteps.SUMMARY:
        this.props.history.push(`${this.props.match.url}/summary`);
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
      isProcessing,
      selectStep,
    } = this.props;

    return [
      <FormattedMessage key="orderTitle" id="COMMON.ORDER">
        {message => (
          <Helmet>
            <title>
              {message}
            </title>
          </Helmet>
        )}
      </FormattedMessage>,
      <Stepper key="orderStepper" orientation="vertical" activeStep={orderStep}>
        <Step>
          <StepButton onClick={() => selectStep(OrderSteps.ADDRESS)}>
            <FormattedMessage id="ORDER.ADDRESS.TITLE" />
          </StepButton>
          <StyledStepContent>
            <StepSpinner isProcessing={isProcessing}>
              <PrivateRoute key="addressStep" path={`${match.url}/address`} component={AddressStepContent} />
            </StepSpinner>
          </StyledStepContent>
        </Step>
        <Step>
          <StepButton onClick={() => selectStep(OrderSteps.AGB)}>
            <FormattedMessage id="ORDER.AGB.TITLE" />
          </StepButton>
          <StyledStepContent>
            <StepSpinner isProcessing={isProcessing}>
              <PrivateRoute key="agbStep" path={`${match.url}/agb`} component={AgbStepContent} />
            </StepSpinner>
          </StyledStepContent>
        </Step>
        <Step>
          <StepButton onClick={() => selectStep(OrderSteps.PAYMENT)}>
            <FormattedMessage id="ORDER.PAYMENT.TITLE" />
          </StepButton>
          <StyledStepContent>
            <StepSpinner isProcessing={isProcessing}>
              <PrivateRoute key="paymentStep" path={`${match.url}/payment`} component={PaymentStepContent} />
            </StepSpinner>
          </StyledStepContent>
        </Step>
        <Step>
          <StepButton onClick={() => selectStep(OrderSteps.PAYMENT)}>
            <FormattedMessage id="ORDER.SUMMARY.TITLE" />
          </StepButton>
          <StyledStepContent>
            <StepSpinner isProcessing={isProcessing}>
              <PrivateRoute key="summaryStep" path={`${match.url}/summary`} component={Summary} />
            </StepSpinner>
          </StyledStepContent>
        </Step>
        <Step>
          <StepButton>
            <FormattedMessage id="ORDER.CONFIRMATION.TITLE" />
          </StepButton>
          <StyledStepContent>
            <StepSpinner isProcessing={isProcessing}>
              <PrivateRoute key="confirmationStep" path={`${match.url}/confirmation`} component={ConfirmationText} />
            </StepSpinner>
          </StyledStepContent>
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
  isProcessing: PropTypes.bool.isRequired,
  selectStep: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(connect(
  state => ({
    shoppingCart: state.shoppingCart,
    orderStep: state.order.step,
    isProcessing: state.order.processing,
  }),
  dispatch => ({
    selectStep(step) {
      dispatch(createSelectStep(step));
    },
  }),
)(OrderStepper));
