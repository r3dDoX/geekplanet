import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createLoadHomeTiles } from '../../actions';
import HomeTile from '../../home/homeTile.jsx';
import HomeTileContainer from '../../home/homeTilesContainer.jsx';
import { HomeTilePropType } from '../../propTypes';
import PrivateRoute from '../../router/privateRoute.jsx';
import AddHomeTile from './addHomeTile.jsx';
import HomeTileDialog from './homeTileDialog.jsx';

class HomeTiles extends React.Component {
  componentWillMount() {
    if (!this.props.tiles.length) {
      this.props.loadHomeTiles();
    }
  }

  render() {
    return (
      <HomeTileContainer>
        {this.props.tiles.map(tile => (
          <Link key={tile._id} to={`/admin/hometiles/${tile._id}`}>
            <HomeTile tile={tile} />
          </Link>
        ))}
        <Link to="/admin/hometiles/new">
          <AddHomeTile />
        </Link>
        <PrivateRoute path="/admin/hometiles/:id" allowedRoles={['admin']} component={HomeTileDialog} />
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
  })
)(HomeTiles);
