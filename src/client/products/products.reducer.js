import ActionTypes from '../actionTypes';

const initialState = {
  products: [],
};

export default function products(state = initialState, { type, data }) {
  switch (type) {
    case ActionTypes.PRODUCTS_LOADED:
      return Object.assign({}, state, {
        products: data,
      });
    default:
      return state;
  }
}
