import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createLoadHomeTiles } from '../actions';
import { HomeTilePropType } from '../propTypes';
import HomeTile from './homeTile';
import HomeTileContainer from './homeTileContainer';

class HomeTiles extends React.Component {
  componentWillMount() {
    if (!this.props.tiles.length) {
      this.props.loadHomeTiles();
    }
  }

  render() {
    return (
      <HomeTileContainer>
        {this.props.tiles.map(tile => <HomeTile key={tile._id} tile={tile} />)}
      </HomeTileContainer>
    );
  }
}

HomeTiles.propTypes = {
  tiles: HomeTilePropType.isRequired,
  loadHomeTiles: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    tiles: state.home.tiles,
  }),
  dispatch => ({
    loadHomeTiles() {
      dispatch(createLoadHomeTiles());
    },
  }),
)(HomeTiles);
