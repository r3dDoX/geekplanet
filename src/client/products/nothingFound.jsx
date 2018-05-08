import { grey500 } from 'material-ui/styles/colors';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { mdMinSize } from '../theme';

const Container = styled.p`
  margin: 0;
  padding: 25px 15px;
  color: ${grey500};
  text-align: center;
  
  @media screen and (min-width: ${mdMinSize}) {
    padding-top: 90px;
  }
`;

export default () => (
  <Container>
    <FormattedMessage id="PRODUCT_FILTER.NOTHING_FOUND" /><br />
    <FormattedMessage id="PRODUCT_FILTER.PRODUCT_WISH" />
  </Container>
);
