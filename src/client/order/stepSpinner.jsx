import PropTypes from 'prop-types';
import React from 'react';
import MainSpinner from '../layout/mainSpinner.jsx';

const StepSpinner = ({ isProcessing, children }) => {
  if (isProcessing) {
    return <MainSpinner />;
  }

  return children;
};

StepSpinner.propTypes = {
  isProcessing: PropTypes.boolean.isRequired,
  children: PropTypes.element.isRequired,
};

export default StepSpinner;
