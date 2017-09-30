import React from 'react';
import DocumentTitle from 'react-document-title';
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
  <div>
    <DocumentTitle title="Home" />
    <Header>
      <SloganContainer>
        <Slogan />
      </SloganContainer>
    </Header>
    <HomeSearch />
    <HomeTiles />
  </div>
);
