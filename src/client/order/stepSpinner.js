import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import MainSpinner from '../layout/mainSpinner';

const MainSpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: initial;
`;

const StepSpinner = ({ isProcessing, children }) => [
  children,
  isProcessing && (
    <MainSpinnerContainer key="stepSpinner">
      <MainSpinner />
    </MainSpinnerContainer>
  ),
];

StepSpinner.propTypes = {
  isProcessing: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default StepSpinner;
