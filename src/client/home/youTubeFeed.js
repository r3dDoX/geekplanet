import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import PropTypes from 'prop-types';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import styled from 'styled-components';
import { createLoadYouTubeFeed } from '../actions';
import { YouTubeFeedPropType } from '../propTypes';

const Container = styled.article`
  max-width: 400px;
`;

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
        <GridList>
          {youTubeFeed.map((movie, index) => (
            <GridListTile
              key={movie.id.videoId}
              cols={index === 0 ? 2 : 1}
              component="a"
              href={`https://www.youtube.com/watch?v=${movie.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="asdf" src={movie.snippet.thumbnails[index === 0 ? 'high' : 'medium'].url} />
              <GridListTileBar title={movie.snippet.title} />
            </GridListTile>
          ))}
        </GridList>
      </Container>
    );
  }
}

YouTubeFeed.propTypes = {
  youTubeFeed: YouTubeFeedPropType.isRequired,
  loadYouTubeFeed: PropTypes.func.isRequired,
};

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
