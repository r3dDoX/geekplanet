import ActionTypes from '../actionTypes';

const initialState = {
  selectedFiles: undefined,
  selectedProductCategory: undefined,
  productCategories: [],
};

export default function forms(state = initialState, { type, data }) {
  switch (type) {
    case ActionTypes.SELECT_UPLOAD_FILES:
      return Object.assign({}, state, {
        selectedFiles: data,
      });
    case ActionTypes.PRODUCT_CATEGORIES_LOADED:
      return Object.assign({}, state, {
        productCategories: data,
      });
    case ActionTypes.PRODUCT_CATEGORY_SELECTED:
      return Object.assign({}, state, {
        selectedProductCategory: data,
      });
    default:
      return state;
  }
}