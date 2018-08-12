import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import styled from 'styled-components';
import { createLoadYouTubeFeed } from '../actions';
import { YouTubeFeedPropType } from '../propTypes';
import { accent2Color } from '../theme';

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
        <GeekplanetTile square>
          <Logo alt="geekplanet Logo" src="/assets/images/logo.svg" />
          <TileText>
            on
          </TileText>
          <Logo alt="Youtube Logo" src="/assets/images/youtube_logo.svg" />
        </GeekplanetTile>
        {youTubeFeed.map((movie, index) => (
          <Tile
            square
            key={movie.id.videoId}
            component="a"
            href={`https://www.youtube.com/watch?v=${movie.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TileImage alt={movie.snippet.title} src={movie.snippet.thumbnails[index === 0 ? 'high' : 'medium'].url} />
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
  padding: 20px;
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
`;

const Tile = styled(Paper)`
  height: 180px;
`;

const TileImage = styled.img`
  height: 100%;
`;

const Logo = styled.img`
  max-width: 80px;
`;

const TileText = styled.span`
  margin: 5px 0 10px;
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
