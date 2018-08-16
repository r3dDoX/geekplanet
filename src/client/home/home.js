import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
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
      TILES
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
  
`;

export default injectIntl(Home);
