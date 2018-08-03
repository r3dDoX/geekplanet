import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Paper from '@material-ui/core/Paper';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import styled from 'styled-components';
import { createLoadYouTubeFeed } from '../actions';
import { YouTubeFeedPropType } from '../propTypes';

class YouTubeFeed extends React.PureComponent {
  componentWillMount() {
    const { youTubeFeed, loadYouTubeFeed } = this.props;

    if (!youTubeFeed.length) {
      loadYouTubeFeed();
    }
  }

  render() {
    const { youTubeFeed, width } = this.props;

    return (
      <Container component="article" square>
        <YouTubeLogo alt="Youtube Logo" src="/assets/images/youtube_logo.svg" />
        <GridList spacing={1} cols={isWidthUp('sm', width) ? 2 : 1}>
          {youTubeFeed.map((movie, index) => (
            <GridListTile
              key={movie.id.videoId}
              cols={index === 0 ? 2 : 1}
              component="a"
              href={`https://www.youtube.com/watch?v=${movie.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="Movie Thumbnail" src={movie.snippet.thumbnails[index === 0 ? 'high' : 'medium'].url} />
              <GridListTileBar title={movie.snippet.title} />
            </GridListTile>
          ))}
        </GridList>
      </Container>
    );
  }
}

YouTubeFeed.propTypes = {
  width: PropTypes.string.isRequired,
  youTubeFeed: YouTubeFeedPropType.isRequired,
  loadYouTubeFeed: PropTypes.func.isRequired,
};

const Container = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  min-width: 100px;
  margin: 10px;
`;

const YouTubeLogo = styled.img`
  margin: 15px;
  height: 25px;
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
)(withWidth()(YouTubeFeed));
