import ActionTypes from '../actionTypes';

const initialState = {
  selectedFiles: undefined,
  productCategories: [],
  selectedProductCategory: undefined,
  producers: [],
  selectedProducer: undefined,
  suppliers: [],
  selectedSupplier: undefined,
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
    case ActionTypes.PRODUCERS_LOADED:
      return Object.assign({}, state, {
        producers: data,
      });
    case ActionTypes.PRODUCER_SELECTED:
      return Object.assign({}, state, {
        selectedProducer: data,
      });
    case ActionTypes.SUPPLIERS_LOADED:
      return Object.assign({}, state, {
        suppliers: data,
      });
    case ActionTypes.SUPPLIER_SELECTED:
      return Object.assign({}, state, {
        selectedSupplier: data,
      });
    default:
      return state;
  }
}
