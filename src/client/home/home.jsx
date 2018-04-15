import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { backgroundColor, xsMaxSize } from '../theme';
import HomeSearch from './homeSearch.jsx';
import HomeTiles from './homeTiles.jsx';
import Slogan from './slogan.jsx';

const Header = styled.div`
  padding: 80px 30px;
  background-color: ${backgroundColor};
  
  @media screen and (max-width: ${xsMaxSize}) {
    display: none;
  }
`;

const SloganContainer = styled.div`
  max-width: 350px;
  margin: 0 auto;
`;

export default () => (
  <div itemScope itemType="http://schema.org/Organization">
    <meta itemProp="url" content={APP.BASE_URL} />
    <meta itemProp="logo" content={`${APP.BASE_URL}/assets/images/icon.png`} />
    <Helmet>
      <title>geekplanet - Tabletop Miniatures</title>
    </Helmet>
    <Header>
      <SloganContainer>
        <Slogan />
      </SloganContainer>
    </Header>
    <HomeSearch />
    <HomeTiles />
  </div>
);
