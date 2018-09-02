import PropTypes from 'prop-types';
import React from 'react';
import Dragula from 'react-dragula';
import 'react-dragula/dist/dragula.css';
import { connect } from 'react-redux';
import { createLoadHomeTiles } from '../../actions';
import { HomeTilePropType } from '../../propTypes';
import Xhr from '../../xhr';


class HomeTiles extends React.Component {
  componentWillMount() {
    if (!this.props.tiles.length) {
      this.props.loadHomeTiles();
    }
  }

  componentDidMount() {
    const drake = Dragula([this.dragulaContainer], {});
    drake.on('drop', (element, target, source, sibling) =>
      Xhr.post('/api/home/tiles/order', {
        element: element.dataset.id,
        sibling: sibling && sibling.dataset.id,
      }).then(this.props.loadHomeTiles),
    );
  }

  render() {
    return (
      <div>
        TODO: creation and editing
      </div>
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
