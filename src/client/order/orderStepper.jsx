import React from 'react';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import { FormattedMessage } from 'react-intl';
import { DatatransProvider } from 'react-datatrans-lightbox';
import LightboxOpener from './lightboxOpener.jsx';

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

export default () => (
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
          <DatatransProvider endpoint="https://pilot.datatrans.biz">
            <LightboxOpener />
          </DatatransProvider>
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
