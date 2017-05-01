import ActionTypes from '../actionTypes';

const initialState = {
  spotlightProducts: [],
  products: [],
  selectedProduct: undefined,
};

export default (state = initialState, { type, spotlightProducts, products, selectedProduct }) => {
  switch (type) {
    case ActionTypes.SPOTLIGHT_PRODUCTS_LOADED:
      return Object.assign({}, state, {
        spotlightProducts,
      });
    case ActionTypes.PRODUCTS_LOADED:
      return Object.assign({}, state, {
        products,
      });
    case ActionTypes.PRODUCT_SELECTED:
      return Object.assign({}, state, {
        selectedProduct,
      });
    default:
      return state;
  }
};
