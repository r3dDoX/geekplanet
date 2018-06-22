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
  <div>
    <Helmet>
      <title>
geekplanet - Tabletop Miniatures
      </title>
      <meta name="Description" content="Tauche ein in das Universum der Tabletop-Spiele. Bestelle Miniaturen, Farben, Bastelmaterialien und Zubehör und erfahre Wissenswertes aus der Welt des Wargaming." />
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
