import {
  PRODUCT_LOADING,
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
  productLoading: false,
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
        productLoading: false,
      });
    case PRODUCTS_FILTERED:
      return Object.assign({}, state, {
        filteredProducts,
      });
    case PRODUCT_LOADING:
      return Object.assign({}, state, {
        productLoading: true,
      });
    default:
      return state;
  }
};
