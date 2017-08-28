import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import styled from 'styled-components';
import {
  createLoadProductCategories,
  createResetFilter,
  createToggleFilterCategory,
} from '../actions';
import { ProductCategoryPropType } from '../propTypes';
import { backgroundColor } from '../theme';

const TilesContainer = styled.div`
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
`;

const Tile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 280px;
  max-width: 400px;
  margin: 5px;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    transition: background-color .45s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  &:hover::before {
    background-color: rgba(255, 255, 255, 0.4);
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
      resetFilter,
      history,
    } = this.props;

    return (
      <TilesContainer>
        <Tile
          onClick={() => {
            resetFilter();
            toggleFilterCategories([
              productCategories.find(category => category._id === '59a2f657edd42108a67ed01a'),
            ]);
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/Hyl6GgDIdeFZ_s" />
          <TileTitle>
            Blood Bowl
          </TileTitle>
        </Tile>
        <Tile
          onClick={() => {
            resetFilter();
            toggleFilterCategories(
              productCategories.filter(category =>
                category._id === '59a2f657edd42108a67ed018'
                || category._id === '59a2f657edd42108a67ecffb'
                || category._id === '59a2f657edd42108a67ecffc'
                || category._id === '59a2f657edd42108a67ecffe'
              )
            );
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/r1YogwUOxtW_s" />
          <TileTitle>
            Airbrush Farben
          </TileTitle>
        </Tile>
        <Tile
          onClick={() => {
            resetFilter();
            toggleFilterCategories(
              productCategories.filter(category =>
                category._id === '59a2f657edd42108a67ed01d'
                || category._id === '59a2f657edd42108a67ed01e'
                || category._id === '59a2f657edd42108a67ed01b'
                || category._id === '59a2f657edd42108a67ed01c'
              )
            );
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/ryH-Xgw8_ltW_s" />
          <TileTitle>
            Warhammer
          </TileTitle>
        </Tile>
        <Tile
          onClick={() => {
            resetFilter();
            toggleFilterCategories([
              productCategories.find(category => category._id === '59a2f657edd42108a67ed00f'),
            ]);
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/BkqTWgPUdlKZ_s" />
          <TileTitle>
            Gebäude
          </TileTitle>
        </Tile>
        <Tile
          onClick={() => {
            resetFilter();
            toggleFilterCategories([
              productCategories.find(category => category._id === '59a2f657edd42108a67ed00b'),
            ]);
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/r1HkblPU_gK-_s" />
          <TileTitle>
            Fertiggelände
          </TileTitle>
        </Tile>
        <Tile
          onClick={() => {
            resetFilter();
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/BkyfelvU_eFZ_s" />
          <TileTitle>
            Alle Produkte
          </TileTitle>
        </Tile>
      </TilesContainer>
    );
  }
}

HomeTiles.propTypes = {
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  resetFilter: PropTypes.func.isRequired,
  toggleFilterCategories: PropTypes.func.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(
  state => ({
    productCategories: state.products.productCategories,
  }),
  dispatch => ({
    resetFilter() {
      dispatch(createResetFilter());
    },
    toggleFilterCategories(category) {
      dispatch(createToggleFilterCategory(category));
    },
    loadProductCategories() {
      dispatch(createLoadProductCategories());
    },
  }),
)(withRouter(HomeTiles));
