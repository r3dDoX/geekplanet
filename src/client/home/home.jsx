import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { backgroundColor } from '../theme';
import HomeTiles from './homeTiles.jsx';
import Slogan from './slogan.jsx';

const Header = styled.div`
  padding: 80px 30px;
  background-color: ${backgroundColor};
  
  @media (max-width: 659px) {
    display: none;
  }
`;

const SloganContainer = styled.div`
  max-width: 350px;
  margin: 0 auto;
`;

const ProductLinkButton = styled(RaisedButton)`
  margin: 20px;
`;

export default () => (
  <div>
    <Header>
      <SloganContainer>
        <Slogan />
      </SloganContainer>
    </Header>
    <HomeTiles />
    <ProductLinkButton
      primary
      label={<FormattedMessage id="PRODUCT.TO_PRODUCTS" />}
      containerElement={<Link to="/products" />}
    />
  </div>
);
