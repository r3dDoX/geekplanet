import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import theme, { accent2Color } from '../theme';
import YouTubeFeed from './youTubeFeed';

const Home = ({ intl }) => (
  <div>
    <Helmet>
      <title>
        geekplanet - Tabletop Miniatures
      </title>
      <meta
        name="Description"
        content={intl.formatMessage({ id: 'HOME.DESCRIPTION' })}
      />
    </Helmet>
    <YouTubeFeed />
    <Container>
      <TileContainer>
        <PrimaryTile square>
          <Logo alt="geekplanet Logo" src="/assets/images/logo.svg" />
        </PrimaryTile>
        {exampleTiles.map(tile => (
          <Tile square key={tile.title}>
            <h3>
              {tile.title}
            </h3>
          </Tile>
        ))}
      </TileContainer>
    </Container>
  </div>
);

Home.propTypes = {
  intl: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 5px;
  
  @media screen and (max-width: ${theme.breakpoints.values.sm}px) {
    justify-content: center;
  }
`;

const TileContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 5px;
  
  @media screen and (max-width: ${theme.breakpoints.values.sm}px) {
    justify-content: center;
  }
`;

const Tile = styled(Paper)`
  margin: 5px;
  flex: 1 1 200px;
  max-width: 300px;
  min-width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  
  @media screen and (max-width: ${theme.breakpoints.values.sm}px) {
    max-width: 400px;
    
    &:after {
      padding-bottom: 0;
    }
  }
`;

const PrimaryTile = styled(Tile)`
  background-color: ${accent2Color} !important;
`;

const Logo = styled.img`
  max-width: 80px;
`;

export default injectIntl(Home);
