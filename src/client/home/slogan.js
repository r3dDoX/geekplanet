import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import styled from 'styled-components';
import { accent2Color, brandSecondary } from '../theme';

const SaleTitle = styled.h1`
  text-align: center;
  color: ${brandSecondary};
`;

const SaleSlogan = styled.h2`
  text-align: center;
  position: relative;
  color: ${accent2Color};
`;

export default () => (
  <div>
    <SaleTitle>
      Grosser Ausverkauf!
    </SaleTitle>
    <SaleSlogan>
      <FormattedHTMLMessage id="HOME.SALE" />
    </SaleSlogan>
  </div>
);
