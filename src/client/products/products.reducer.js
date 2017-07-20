import {
  PRODUCT_SELECTED,
  PRODUCTS_FILTERED,
  PRODUCTS_LOADED,
  SPOTLIGHT_PRODUCTS_LOADED,
} from '../actions';

const initialState = {
  spotlightProducts: [],
  products: [],
  filteredProducts: [],
  selectedProduct: undefined,
};

export default (state = initialState, {
  type, spotlightProducts, products,
  selectedProduct, filteredProducts,
}) => {
  switch (type) {
    case SPOTLIGHT_PRODUCTS_LOADED:
      return Object.assign({}, state, {
        spotlightProducts,
      });
    case PRODUCTS_LOADED:
      return Object.assign({}, state, {
        products,
        filteredProducts: products,
      });
    case PRODUCT_SELECTED:
      return Object.assign({}, state, {
        selectedProduct,
      });
    case PRODUCTS_FILTERED:
      return Object.assign({}, state, {
        filteredProducts,
      });
    default:
      return state;
  }
};
