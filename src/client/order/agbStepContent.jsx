import RaisedButton from 'material-ui/RaisedButton';
import { grey300 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createAcceptAgb } from '../actions';
import Agb from '../agb.jsx';

const Container = styled.div`
  margin-top: 20px;
`;

const ScrollableContainer = styled.div`
  max-height: 200px;
  overflow-y: scroll;
  border: 1px solid ${grey300};
`;

const AcceptButton = styled(RaisedButton)`
  margin-top: 10px;
`;

const AgbStepContent = ({ acceptAgb }) => (
  <Container>
    <ScrollableContainer>
      <Agb />
    </ScrollableContainer>
    <AcceptButton
      primary
      label={<FormattedMessage id="ORDER.AGB.ACCEPT" />}
      onClick={acceptAgb}
    />
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
