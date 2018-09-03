import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';
import Dragula from 'react-dragula';
import 'react-dragula/dist/dragula.css';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createLoadHomeTiles } from '../../actions';
import HomeTile from '../../home/homeTile';
import HomeTileContainer from '../../home/homeTileContainer';
import { HomeTilePropType } from '../../propTypes';
import Xhr from '../../xhr';

class HomeTiles extends React.Component {
  constructor(props) {
    super(props);

    this.dragulaContainer = React.createRef();
  }

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
    return [
      <HomeTileContainer innerRef={this.dragulaContainer} key="tileContainer">
        {this.props.tiles.map(tile => <HomeTile key={tile._id} tile={tile} />)}
      </HomeTileContainer>,
      <ButtonBar key="buttonBar">
        <Button
          color="primary"
          variant="contained"
        >
          <AddIcon />
          &nbsp;
          Create New Tile
        </Button>
      </ButtonBar>,
    ];
  }
}

HomeTiles.propTypes = {
  tiles: HomeTilePropType.isRequired,
  loadHomeTiles: PropTypes.func.isRequired,
};

const ButtonBar = styled.div`
  padding: 15px;
`;

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
