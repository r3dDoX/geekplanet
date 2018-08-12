import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import styled from 'styled-components';
import { createLoadYouTubeFeed } from '../actions';
import { YouTubeFeedPropType } from '../propTypes';
import { accent2Color, brandPrimary } from '../theme';

class YouTubeFeed extends React.PureComponent {
  componentWillMount() {
    const { youTubeFeed, loadYouTubeFeed } = this.props;

    if (!youTubeFeed.length) {
      loadYouTubeFeed();
    }
  }

  render() {
    const { youTubeFeed } = this.props;

    return (
      <Container>
        <GeekplanetTile
          square
          title="YouTube Channel"
          component="a"
          href="https://www.youtube.com/channel/UCi7zjH3DyAvJoIlG8llygyQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Logo alt="Youtube Logo" src="/assets/images/youtube_dark.png" />
        </GeekplanetTile>
        {youTubeFeed.map(movie => (
          <Tile
            square
            key={movie.id.videoId}
            title={movie.snippet.title}
            component="a"
            href={`https://www.youtube.com/watch?v=${movie.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TileImage alt={movie.snippet.title} src={movie.snippet.thumbnails.medium.url} />
          </Tile>
        ))}
      </Container>
    );
  }
}

YouTubeFeed.propTypes = {
  youTubeFeed: YouTubeFeedPropType.isRequired,
  loadYouTubeFeed: PropTypes.func.isRequired,
};

const Container = styled.article`
  padding: 15px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  background-color: ${accent2Color};
  
  & > :not(:last-child) {
    margin-right: 5px;
  }
`;

const GeekplanetTile = styled(Paper)`
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  background-color: ${brandPrimary} !important;
`;

const Tile = styled(Paper)`
  height: 180px;
  transition: transform .15s ease-in-out;
  
  &:hover, &:focus {
    transform: perspective(400px) translateZ(20px);
    outline: none;
  }
`;

const TileImage = styled.img`
  height: 100%;
`;

const Logo = styled.img`
  max-width: 100px;
`;

export default connect(
  state => ({
    youTubeFeed: state.home.youTubeFeed,
  }),
  dispatch => ({
    loadYouTubeFeed() {
      dispatch(createLoadYouTubeFeed(dispatch));
    },
  }),
)(YouTubeFeed);
