import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { createLoadProductCategories, createToggleFilterCategory } from '../actions';
import { ProductCategoryPropType } from '../propTypes';
import { backgroundColor } from '../theme';

const TileContainer = styled.div`
  padding: 20px 15px;
  display: flex;
  flex-wrap: wrap;
`;

const TileTitle = styled.h1`
  margin: 0;
  padding: 10px;
  font-size: 1.5em;
  font-weight: 400;
  background-color: ${backgroundColor};
  color: #FFF;
  transition: background-color .450s cubic-bezier(0.23, 1, 0.32, 1);
`;

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  margin: 5px;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  
  &:hover ${TileTitle} {
    background-color: rgb(113, 120, 131);
  }
`;

const TileImage = styled.img`
  width: 100%;
`;

class HomeTiles extends React.Component {
  componentWillMount() {
    if (!this.props.productCategories.length) {
      this.props.loadProductCategories();
    }
  }

  render() {
    const {
      productCategories,
      toggleFilterCategories,
      history,
    } = this.props;

    return (
      <TileContainer>
        <Tile>
          <TileImage src="/api/products/pictures/BkNMZCJUlfdW_m" />
          <TileTitle>
            Blood Bowl
          </TileTitle>
        </Tile>
        <Tile
          onClick={() => {
            toggleFilterCategories([
              productCategories.find(category => category._id === '599475e53c965b2ea8aca542'),
            ]);
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/rJqkxCkIlMOZ_m" />
          <TileTitle>
            Spielmatten
          </TileTitle>
        </Tile>
        <Tile>
          <TileImage src="/api/products/pictures/rypD61IeMuW_m" />
          <TileTitle>
            Farben
          </TileTitle>
        </Tile>
      </TileContainer>
    );
  }
}

HomeTiles.propTypes = {
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  toggleFilterCategories: PropTypes.func.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(
  state => ({
    productCategories: state.products.productCategories,
  }),
  dispatch => ({
    toggleFilterCategories(category) {
      dispatch(createToggleFilterCategory(category));
    },
    loadProductCategories() {
      dispatch(createLoadProductCategories());
    },
  }),
)(withRouter(HomeTiles));
