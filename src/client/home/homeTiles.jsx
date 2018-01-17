import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createLoadHomeTiles, createLoadProductCategories, createResetFilter } from '../actions';
import { HomeTilePropType, ProductCategoryPropType } from '../propTypes';
import HomeTile from './homeTile.jsx';
import HomeTilesContainer from './homeTilesContainer.jsx';

class HomeTiles extends React.Component {
  componentWillMount() {
    if (!this.props.productCategories.length) {
      this.props.loadProductCategories();
    }
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
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  resetFilter: PropTypes.func.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  tiles: HomeTilePropType.isRequired,
  loadHomeTiles: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    tiles: state.home.tiles,
    productCategories: state.products.productCategories,
  }),
  dispatch => ({
    resetFilter() {
      dispatch(createResetFilter());
    },
    loadProductCategories() {
      dispatch(createLoadProductCategories());
    },
    loadHomeTiles() {
      dispatch(createLoadHomeTiles());
    },
  }),
)(HomeTiles);
