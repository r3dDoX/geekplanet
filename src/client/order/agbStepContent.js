import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createAcceptAgb } from '../actions';
import Agb from '../agb';

const grey300 = grey['300'];

const Container = styled.div`
  margin-top: 20px;
`;

const ScrollableContainer = styled.div`
  max-height: 200px;
  overflow-y: scroll;
  border: 1px solid ${grey300};
`;

const AcceptButton = styled(Button)`
  margin-top: 10px;
`;

const AgbStepContent = ({ acceptAgb }) => (
  <Container>
    <ScrollableContainer>
      <Agb />
    </ScrollableContainer>
    <br />
    <AcceptButton
      variant="contained"
      color="primary"
      onClick={acceptAgb}
    >
      <FormattedMessage id="ORDER.AGB.ACCEPT" />
    </AcceptButton>
  </Container>
);

AgbStepContent.propTypes = {
  acceptAgb: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  dispatch => ({
    acceptAgb() {
      dispatch(createAcceptAgb());
    },
  }),
)(AgbStepContent);
