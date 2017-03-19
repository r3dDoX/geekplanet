import ActionTypes from '../../actionTypes';

const initialState = {
  selectedFiles: undefined,
  productCategories: [],
  selectedProductProductCategory: undefined,
  selectedProductCategory: {},
  producers: [],
  selectedProductProducer: undefined,
  selectedProducer: {},
  suppliers: [],
  selectedSupplier: {},
  selectedProductSupplier: undefined,
  selectedTab: '0',
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
    case ActionTypes.SELECT_PRODUCT_CATEGORY:
      return Object.assign({}, state, {
        selectedProductCategory: data || {},
      });
    case ActionTypes.PRODUCT_CATEGORY_SELECTED:
      return Object.assign({}, state, {
        selectedProductProductCategory: data,
      });
    case ActionTypes.PRODUCERS_LOADED:
      return Object.assign({}, state, {
        producers: data,
      });
    case ActionTypes.SELECT_PRODUCER:
      return Object.assign({}, state, {
        selectedProducer: data || {},
      });
    case ActionTypes.SELECT_PRODUCT_PRODUCER:
      return Object.assign({}, state, {
        selectedProductProducer: data,
      });
    case ActionTypes.SUPPLIERS_LOADED:
      return Object.assign({}, state, {
        suppliers: data,
      });
    case ActionTypes.SELECT_SUPPLIER:
      return Object.assign({}, state, {
        selectedSupplier: data || {},
      });
    case ActionTypes.SELECT_PRODUCT_SUPPLIER:
      return Object.assign({}, state, {
        selectedProductSupplier: data,
      });
    case ActionTypes.SELECT_FORMS_TABS:
      return Object.assign({}, state, {
        selectedTab: data,
      });
    default:
      return state;
  }
}
