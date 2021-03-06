import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';
import React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';

const grey600 = grey['600'];

const Container = styled.div`
  margin: 0 auto;
  max-width: 450px;
  padding: 20px;
`;

const StyledSentimentNeutral = styled(SentimentVeryDissatisfied)`
  margin-right: 10px;
  height: 48px !important;
  width: 48px !important;
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  padding: 20px 0 10px;
  text-align: justify;
`;

const ProTip = styled.p`
  padding: 10px 0 40px;
  color: ${grey600};
  text-align: justify;
`;

export default () => (
  <Container>
    <Title>
      <StyledSentimentNeutral />
      <FormattedMessage id="ERROR.TITLE" />
    </Title>
    <Text>
      <FormattedMessage id="ERROR.TEXT" />
    </Text>
    <ProTip>
      <strong>
        Protip
      </strong>
      <br />
      <FormattedHTMLMessage id="ERROR.PROTIP" />
    </ProTip>
  </Container>
);
