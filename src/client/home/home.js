import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import YouTubeFeed from './youTubeFeed';

const Home = ({ intl }) => (
  <Container>
    <Helmet>
      <title>
        geekplanet - Tabletop Miniatures
      </title>
      <meta
        name="Description"
        content={intl.formatMessage({ id: 'HOME.DESCRIPTION' })}
      />
    </Helmet>
    <TileContainer>
      TILES
    </TileContainer>
    <YouTubeFeed />
  </Container>
);

Home.propTypes = {
  intl: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const Container = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
`;

const TileContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 5px;
  
`;

export default injectIntl(Home);
