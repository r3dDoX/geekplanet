import ActionTypes from '../actionTypes';

const initialState = {
  products: [],
  selectedProduct: undefined,
};

export default function products(state = initialState, { type, data }) {
  switch (type) {
    case ActionTypes.PRODUCTS_LOADED:
      return Object.assign({}, state, {
        products: data,
      });
    case ActionTypes.PRODUCT_SELECTED:
      return Object.assign({}, state, {
        selectedProduct: data,
      });
    default:
      return state;
  }
}
