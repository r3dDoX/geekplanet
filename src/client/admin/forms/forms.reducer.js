import ActionTypes from '../../actionTypes';

const initialState = {
  selectedFiles: [],
  products: [],
  productCategories: [],
  producers: [],
  suppliers: [],
  selectedTab: '0',
};

export default function forms(state = initialState, { type, data }) {
  switch (type) {
    case ActionTypes.SELECT_UPLOAD_FILES:
      return Object.assign({}, state, {
        selectedFiles: data.concat(state.selectedFiles),
      });
    case ActionTypes.RESET_SELECTED_FILES:
      return Object.assign({}, state, {
        selectedFiles: initialState.selectedFiles,
      });
    case ActionTypes.SELECT_PRODUCT:
      return Object.assign({}, state, {
        selectedFiles: data.files,
      });
    case ActionTypes.PRODUCTS_LOADED:
      return Object.assign({}, state, {
        products: data,
      });
    case ActionTypes.PRODUCT_CATEGORIES_LOADED:
      return Object.assign({}, state, {
        productCategories: data,
      });
    case ActionTypes.PRODUCERS_LOADED:
      return Object.assign({}, state, {
        producers: data,
      });
    case ActionTypes.SUPPLIERS_LOADED:
      return Object.assign({}, state, {
        suppliers: data,
      });
    case ActionTypes.SELECT_FORMS_TABS:
      return Object.assign({}, state, {
        selectedTab: data,
      });
    default:
      return state;
  }
}
