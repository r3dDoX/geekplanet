import { grey800 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import React from 'react';
import Dragula from 'react-dragula';
import 'react-dragula/dist/dragula.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createLoadHomeTiles } from '../../actions';
import HomeTile from '../../home/homeTile.jsx';
import HomeTileContainer from '../../home/homeTilesContainer.jsx';
import { HomeTilePropType } from '../../propTypes';
import PrivateRoute from '../../router/privateRoute.jsx';
import Xhr from '../../xhr';
import AddHomeTile from './addHomeTile.jsx';
import HomeTileDialog from './homeTileDialog.jsx';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${grey800};
`;

class HomeTiles extends React.Component {
  componentWillMount() {
    if (!this.props.tiles.length) {
      this.props.loadHomeTiles();
    }
  }

  componentDidMount() {
    const drake = Dragula([this.dragulaContainer], {});
    drake.on('drop', (element, target, source, sibling) =>
      Xhr.post('/api/hometiles/order', {
        element: element.dataset.id,
        sibling: sibling && sibling.dataset.id,
      }).then(this.props.loadHomeTiles)
    );
  }

  render() {
    return (
      <HomeTileContainer innerRef={(element) => { this.dragulaContainer = element; }}>
        {this.props.tiles.map(tile => (
          <StyledLink key={tile._id} data-id={tile._id} to={`/admin/hometiles/${tile._id}`}>
            <HomeTile tile={tile} />
          </StyledLink>
        ))}
        <Link to="/admin/hometiles/new">
          <AddHomeTile />
        </Link>
        <PrivateRoute
          path="/admin/hometiles/:id"
          allowedRoles={['admin']}
          component={HomeTileDialog}
        />
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
