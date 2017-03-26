import ActionTypes from '../../actionTypes';

const initialState = {
  selectedFiles: [],
  tags: [],
  savedTags: [],
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
        tags: initialState.tags,
      });
    case ActionTypes.REMOVE_SELECTED_FILE:
      return Object.assign({}, state, {
        selectedFiles: state.selectedFiles.filter(fileId => fileId !== data),
      });
    case ActionTypes.SELECT_PRODUCT:
      return Object.assign({}, state, {
        selectedFiles: (data && data.files) || initialState.selectedFiles,
        tags: (data && data.tags) || initialState.tags,
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
    case ActionTypes.TAGS_LOADED:
      return Object.assign({}, state, {
        savedTags: data.map(tag => tag.name),
      });
    case ActionTypes.SET_TAGS:
      return Object.assign({}, state, {
        tags: data,
      });
    default:
      return state;
  }
}
