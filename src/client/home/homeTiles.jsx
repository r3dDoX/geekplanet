import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createLoadHomeTiles, createResetFilter } from '../actions';
import { HomeTilePropType } from '../propTypes';
import HomeTile from './homeTile.jsx';
import HomeTilesContainer from './homeTilesContainer.jsx';

class HomeTiles extends React.Component {
  componentWillMount() {
    if (!this.props.tiles.length) {
      this.props.loadHomeTiles();
    }
  }

  render() {
    const {
      resetFilter,
      tiles,
    } = this.props;

    return (
      <HomeTilesContainer>
        {tiles.map(tile => (
          <HomeTile
            key={tile._id}
            tile={tile}
            link={tile.category ? `/products?categories=${tile.category}` : '/products'}
            onClick={resetFilter}
          />
        ))}
      </HomeTilesContainer>
    );
  }
}

HomeTiles.propTypes = {
  resetFilter: PropTypes.func.isRequired,
  tiles: HomeTilePropType.isRequired,
  loadHomeTiles: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    tiles: state.home.tiles,
  }),
  dispatch => ({
    resetFilter() {
      dispatch(createResetFilter());
    },
    loadHomeTiles() {
      dispatch(createLoadHomeTiles());
    },
  }),
)(HomeTiles);
