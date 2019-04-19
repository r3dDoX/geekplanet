import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import theme, { backgroundColor } from '../theme';
import HomeSearch from './homeSearch';
import HomeTiles from './homeTiles';
import Slogan from './slogan';

const Header = styled.div`
  padding: 40px 30px;
  background-color: ${backgroundColor};
  
  @media screen and (max-width: ${theme.breakpoints.values.sm}px) {
    display: none;
  }
`;

const SloganContainer = styled.div`
  max-width: 550px;
  margin: 0 auto;
`;

export default () => (
  <div>
    <Helmet>
      <title>
        geekplanet - Tabletop Miniatures
      </title>
      <meta
        name="Description"
        content="Tauche ein in das Universum der Tabletop-Spiele. Bestelle Miniaturen, Farben, Bastelmaterialien und Zubehör und erfahre Wissenswertes aus der Welt des Wargaming."
      />
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
