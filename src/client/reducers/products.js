import ActionTypes from '../actionTypes';

const initialState = {
  selectedFiles: undefined,
  products: [],
};

export default function products(state = initialState, { type, data }) {
  switch (type) {
    case ActionTypes.SELECT_UPLOAD_FILES:
      return Object.assign({}, state, {
        selectedFiles: data,
      });
    case ActionTypes.PRODUCTS_LOADED:
      return Object.assign({}, state, {
        products: data,
      });
    default:
      return state;
  }
}