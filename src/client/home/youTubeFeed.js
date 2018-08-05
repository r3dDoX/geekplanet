import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
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
    const { youTubeFeed, classes } = this.props;

    return (
      <Container>
        <GeekplanetTile square>
          <Logo alt="geekplanet Logo" src="/assets/images/logo.svg" />
          <TileText>
            on
          </TileText>
          <Logo alt="Youtube Logo" src="/assets/images/youtube_logo.svg" />
        </GeekplanetTile>
        <FeedContainer square>
          <GridList className={classes.gridList} spacing={1} cols={4}>
            {youTubeFeed.map((movie, index) => (
              <GridListTile
                key={movie.id.videoId}
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
        </FeedContainer>
      </Container>
    );
  }
}

YouTubeFeed.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  youTubeFeed: YouTubeFeedPropType.isRequired,
  loadYouTubeFeed: PropTypes.func.isRequired,
};

const styles = () => ({
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
});

const Container = styled.article`
  display: flex;
  flex-wrap: nowrap;
  padding: 20px;
  background-color: ${accent2Color};
`;

const GeekplanetTile = styled(Paper)`
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  margin-right: 10px;
`;

const FeedContainer = styled(Paper)`
  flex: 1 0 0;
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
)(withStyles(styles)(YouTubeFeed));
