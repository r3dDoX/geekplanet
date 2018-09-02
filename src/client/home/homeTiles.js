import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createLoadHomeTiles } from '../actions';
import { HomeTilePropType } from '../propTypes';
import theme from '../theme';
import HomeTile from './homeTile';

class HomeTiles extends React.Component {
  componentWillMount() {
    if (!this.props.tiles.length) {
      this.props.loadHomeTiles();
    }
  }

  render() {
    return (
      <TileContainer>
        {this.props.tiles.map(tile => <HomeTile key={tile._id} tile={tile} />)}
      </TileContainer>
    );
  }
}

HomeTiles.propTypes = {
  tiles: HomeTilePropType.isRequired,
  loadHomeTiles: PropTypes.func.isRequired,
};

const TileContainer = styled.div`
  flex: 1;
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  
  @media screen and (max-width: ${theme.breakpoints.values.xl}px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  
  @media screen and (max-width: ${theme.breakpoints.values.lg}px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  @media screen and (max-width: ${theme.breakpoints.values.sm}px) {
    grid-template-columns: 1fr;
  }
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
