import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
  createLoadHomeTiles,
  createLoadProductCategories,
  createLoadProducts,
} from '../../actions';
import HomeTile from '../../home/homeTile.jsx';
import HomeTileContainer from '../../home/homeTilesContainer.jsx';
import { HomeTilePropType, ProductCategoryPropType, ProductPropType } from '../../propTypes';
import AddHomeTile from './addHomeTile.jsx';
import HomeTileDialog, { formName as homeTileFormName } from './homeTileDialog.jsx';

const selector = formValueSelector(homeTileFormName);

class HomeTilesForm extends React.Component {
  componentWillMount() {
    if (!this.props.tiles.length) {
      this.props.loadHomeTiles();
    }
    if (!this.props.productCategories.length) {
      this.props.loadProductCategories();
    }
    if (!this.props.products.length) {
      this.props.loadProducts();
    }
  }

  render() {
    const {
      tiles,
      products,
      productCategories,
      selectedCategory,
    } = this.props;

    return (
      <HomeTileContainer>
        {tiles.map(tile => <HomeTile key={tile._id} tile={tile} />)}
        <AddHomeTile />
        <HomeTileDialog
          products={products}
          productCategories={productCategories}
          selectedCategory={selectedCategory}
        />
      </HomeTileContainer>
    );
  }
}

HomeTilesForm.propTypes = {
  tiles: HomeTilePropType.isRequired,
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  loadHomeTiles: PropTypes.func.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    tiles: state.home.tiles,
    productCategories: state.products.productCategories,
    products: state.products.products,
    selectedCategory: selector(state, 'category'),
  }),
  dispatch => ({
    loadProducts() {
      dispatch(createLoadProducts());
    },
    loadHomeTiles() {
      dispatch(createLoadHomeTiles());
    },
    loadProductCategories() {
      dispatch(createLoadProductCategories());
    },
  })
)(HomeTilesForm);
