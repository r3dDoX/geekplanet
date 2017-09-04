import { grey300 } from 'material-ui/styles/colors';
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

const TilesContainer = styled.div`
  padding: 20px 15px;
  display: flex;
  flex-wrap: wrap;
`;

const TileTitle = styled.h1`
  margin: 0;
  padding: 8px;
  font-size: 1.2em;
  font-weight: 400;
  background-color: ${grey300};
  box-shadow: inset 0 2px 5px -3px rgba(0, 0, 0, 0.4);
  border-radius: 0 0 5px 5px;
  text-align: center;
`;

const Tile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 280px;
  max-width: 400px;
  margin: 5px;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  border-radius: 5px;
  
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
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const TileImage = styled.img`
  width: 100%;
  border-radius: 5px 5px 0 0;
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
      toggleFilterCategory,
      resetFilter,
      history,
    } = this.props;

    return (
      <TilesContainer>
        <Tile
          onClick={() => {
            resetFilter();
            toggleFilterCategory(productCategories.find(category => category._id === '59abd53c1661e03d9f8c3b64'));
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/rJIZ7SBBLYtW_s" />
          <TileTitle>
            Warhamer 40k
          </TileTitle>
        </Tile>
        <Tile
          onClick={() => {
            resetFilter();
            toggleFilterCategory(productCategories.find(category => category._id === '59abd53c1661e03d9f8c3b62'));
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/HkWazBHHUtKb_s" />
          <TileTitle>
            Blood Bowl
          </TileTitle>
        </Tile>
        <Tile
          onClick={() => {
            resetFilter();
            toggleFilterCategory(productCategories.find(category => category._id === '59abd5870edd567ca018e468'));
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/BJjp-rrBLKtW_s" />
          <TileTitle>
            Spielgelände
          </TileTitle>
        </Tile>
        <Tile
          onClick={() => {
            resetFilter();
            toggleFilterCategory(productCategories.find(category => category._id === '59abd5870edd567ca018e469'));
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/Hyt8lSrr8FKW_s" />
          <TileTitle>
            Airbrush
          </TileTitle>
        </Tile>
        <Tile
          onClick={() => {
            resetFilter();
            toggleFilterCategory(productCategories.find(category => category._id === '59abd5870edd567ca018e467'));
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/SJvbSBSIKYW_s" />
          <TileTitle>
            Farben
          </TileTitle>
        </Tile>
        <Tile
          onClick={() => {
            resetFilter();
            toggleFilterCategory(productCategories.find(category => category._id === '59abd5870edd567ca018e466'));
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/HJ5mxHrSIKKW_s" />
          <TileTitle>
            Hobbymaterial
          </TileTitle>
        </Tile>
        <Tile
          onClick={() => {
            resetFilter();
            history.push('/products');
          }}
        >
          <TileImage src="/api/products/pictures/Bk3cbrHBIKtZ_s" />
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
  toggleFilterCategory: PropTypes.func.isRequired,
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
    toggleFilterCategory(category) {
      dispatch(createToggleFilterCategory(category, true));
    },
    loadProductCategories() {
      dispatch(createLoadProductCategories());
    },
  }),
)(withRouter(HomeTiles));
