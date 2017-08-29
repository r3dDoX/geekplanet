import React from 'react';
import styled from 'styled-components';
import { backgroundColor } from '../theme';
import HomeSearch from './homeSearch.jsx';
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

export default () => (
  <div>
    <Header>
      <SloganContainer>
        <Slogan />
      </SloganContainer>
    </Header>
    <HomeSearch />
    <HomeTiles />
  </div>
);
