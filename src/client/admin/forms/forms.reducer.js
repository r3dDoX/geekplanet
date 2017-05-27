import {
  COMPLETE_PRODUCTS_LOADED,
  PRODUCERS_LOADED,
  PRODUCT_CATEGORIES_LOADED,
  REMOVE_SELECTED_FILE, RESET_SELECTED_FILES, SELECT_FORMS_TABS, SELECT_PRODUCT,
  SELECT_UPLOAD_FILES, SET_TAGS, SUPPLIERS_LOADED, TAGS_LOADED,
} from '../adminActions';

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

export default function forms(state = initialState, { type, data, products }) {
  switch (type) {
    case SELECT_UPLOAD_FILES:
      return Object.assign({}, state, {
        selectedFiles: data.concat(state.selectedFiles),
      });
    case RESET_SELECTED_FILES:
      return Object.assign({}, state, {
        selectedFiles: initialState.selectedFiles,
        tags: initialState.tags,
      });
    case REMOVE_SELECTED_FILE:
      return Object.assign({}, state, {
        selectedFiles: state.selectedFiles.filter(fileId => fileId !== data),
      });
    case SELECT_PRODUCT:
      return Object.assign({}, state, {
        selectedFiles: (data && data.files) || initialState.selectedFiles,
        tags: (data && data.tags) || initialState.tags,
      });
    case COMPLETE_PRODUCTS_LOADED:
      return Object.assign({}, state, {
        products,
      });
    case PRODUCT_CATEGORIES_LOADED:
      return Object.assign({}, state, {
        productCategories: data,
      });
    case PRODUCERS_LOADED:
      return Object.assign({}, state, {
        producers: data,
      });
    case SUPPLIERS_LOADED:
      return Object.assign({}, state, {
        suppliers: data,
      });
    case SELECT_FORMS_TABS:
      return Object.assign({}, state, {
        selectedTab: data,
      });
    case TAGS_LOADED:
      return Object.assign({}, state, {
        savedTags: data.map(tag => tag.name),
      });
    case SET_TAGS:
      return Object.assign({}, state, {
        tags: data,
      });
    default:
      return state;
  }
}
