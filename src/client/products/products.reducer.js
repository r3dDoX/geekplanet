import { PRODUCT_SELECTED, PRODUCTS_LOADED, SPOTLIGHT_PRODUCTS_LOADED } from '../actions';

const initialState = {
  spotlightProducts: [],
  products: [],
  selectedProduct: undefined,
};

export default (state = initialState, { type, spotlightProducts, products, selectedProduct }) => {
  switch (type) {
    case SPOTLIGHT_PRODUCTS_LOADED:
      return Object.assign({}, state, {
        spotlightProducts,
      });
    case PRODUCTS_LOADED:
      return Object.assign({}, state, {
        products,
      });
    case PRODUCT_SELECTED:
      return Object.assign({}, state, {
        selectedProduct,
      });
    default:
      return state;
  }
};
