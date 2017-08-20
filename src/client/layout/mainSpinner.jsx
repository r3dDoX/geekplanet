import CircularProgress from 'material-ui/CircularProgress';
import React from 'react';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 80px 0;
`;

export default () => (
  <SpinnerContainer>
    <CircularProgress size={80} thickness={5} />
  </SpinnerContainer>
);
