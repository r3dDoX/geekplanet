import { reset } from 'redux-form';
import TranslationService from '../common/translationService';
import { formName as productFilterFormName } from './products/productfilter/productFilter.jsx';
import Xhr from './xhr';

export const PRODUCT_LOADING = 'PRODUCT_LOADING';
export const PRODUCT_SELECTED = 'PRODUCT_SELECTED';
export const PRODUCT_CATEGORIES_LOADED = 'PRODUCT_CATEGORIES_LOADED';
export const PUBLIC_PRODUCERS_LOADED = 'PUBLIC_PRODUCERS_LOADED';
export const TRANSLATIONS_LOADED = 'TRANSLATIONS_LOADED';
export const PROCESSING_AUTH = 'PROCESSING_AUTH';
export const FINISHED_AUTH = 'FINISHED_AUTH';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const TOGGLE_SHOPPING_CART_DRAWER = 'TOGGLE_SHOPPING_CART_DRAWER';
export const ADD_ITEM_TO_SHOPPING_CART = 'ADD_ITEM_TO_SHOPPING_CART';
export const LOAD_SHOPPING_CART = 'LOAD_SHOPPING_CART';
export const HIDE_SHOPPING_CART_NOTIFICATION = 'HIDE_SHOPPING_CART_NOTIFICATION';
export const SET_SHOPPING_CART_AMOUNT = 'SET_AMOUNT';
export const ORDER_FINISHED = 'ORDER_FINISHED';
export const PROCESSING_STARTED = 'PROCESSING_STARTED';
export const SAVE_ADDRESS = 'SAVE_ADDRESS';
export const ADDRESSES_LOADED = 'ADDRESSES_LOADED';
export const SELECT_ADDRESS = 'SELECT_ADDRESS';
export const SELECT_ORDER_STEP = 'SELECT_ORDER_STEP';
export const PRODUCTS_LOADED = 'PRODUCTS_LOADED';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
export const REGISTRATION_SUCCESSFUL = 'REGISTRATION_SUCCESSFUL';
export const TOGGLE_FILTER_CATEGORY = 'TOGGLE_FILTER_CATEGORY';
export const TOGGLE_FILTER_PRODUCER = 'TOGGLE_FILTER_PRODUCER';
export const TOGGLE_FILTER_VIEW = 'TOGGLE_FILTER_VIEW';
export const RESET_FILTER = 'RESET_FILTER';
export const SAVING_ADDRESS = 'SAVING_ADDRESS';
export const SELECT_UPLOAD_FILES = 'SELECT_UPLOAD_FILES';
export const REMOVE_SELECTED_FILE = 'REMOVE_SELECTED_FILE';
export const RESET_SELECTED_FILES = 'RESET_SELECTED_FILES';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const PRODUCERS_LOADED = 'PRODUCERS_LOADED';
export const SUPPLIERS_LOADED = 'SUPPLIERS_LOADED';
export const TAGS_LOADED = 'TAGS_LOADED';
export const SET_TAGS = 'SET_TAGS';
export const COMPLETE_PRODUCTS_LOADED = 'COMPLETE_PRODUCTS_LOADED';
export const ORDERS_LOADED = 'ORDERS_LOADED';

export const createLoadTranslations = localeWithFallback => dispatch =>
  Xhr.get(`/assets/translations/${localeWithFallback}.json`)
    .then(TranslationService.transformTranslations)
    .then(translations => dispatch({
      type: TRANSLATIONS_LOADED,
      translations,
    }));

export const createLoadShoppingCart = () => ({
  type: LOAD_SHOPPING_CART,
});

export const createLoggedIn = ({ email, 'https://geekplanet.ch/roles': roles }) => ({
  type: LOGGED_IN,
  profile: {
    email,
    roles,
  },
});

export const createFilterProducts = filterString => ({
  type: FILTER_PRODUCTS,
  filterString,
});

export const createToggleFilterCategory = productCategories => ({
  type: TOGGLE_FILTER_CATEGORY,
  productCategories,
});

export const createToggleFilterProducer = producers => ({
  type: TOGGLE_FILTER_PRODUCER,
  producers,
});

export const createToggleFilterView = () => ({
  type: TOGGLE_FILTER_VIEW,
});

export const createLogout = () => ({
  type: LOGGED_OUT,
});

export const createToggleDrawer = () => ({
  type: TOGGLE_DRAWER,
});

export const createToggleShoppingCartDrawer = () => ({
  type: TOGGLE_SHOPPING_CART_DRAWER,
});

export const createHideShoppingCartNotification = () => ({
  type: HIDE_SHOPPING_CART_NOTIFICATION,
});

const loadAndDispatchAddresses = dispatch =>
  Xhr.get('/api/userAddresses')
    .then(addresses => dispatch({
      type: ADDRESSES_LOADED,
      data: addresses,
    }));

export const createLoadAddresses = () => loadAndDispatchAddresses;

export const createSelectAddress = address => ({
  type: SELECT_ADDRESS,
  data: address,
});

export const createSaveAddress = address => (dispatch) => {
  dispatch({
    type: SAVING_ADDRESS,
  });

  Xhr.put(
    '/api/userAddress',
    address,
    'application/json',
  )
    .then((addressId) => {
      Xhr.get('/api/userAddresses')
        .then((addresses) => {
          dispatch({
            type: ADDRESSES_LOADED,
            data: addresses,
          });
          dispatch({
            type: SELECT_ADDRESS,
            data: addresses.find(actAddress => actAddress._id === addressId),
          });
          dispatch({
            type: SAVE_ADDRESS,
            data: addressId,
          });
        });
    });
};

export const createSelectStep = step => ({
  type: SELECT_ORDER_STEP,
  data: step,
});

export const createProcessingStarted = () => ({
  type: PROCESSING_STARTED,
});

export const createFinishOrder = () => ({
  type: ORDER_FINISHED,
});

export const createLoadProduct = productId => (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
  });

  Xhr.get(`/api/products/${productId}`)
    .then(selectedProduct => dispatch({
      type: PRODUCT_SELECTED,
      selectedProduct,
    }));
};

export const createAddItemToShoppingCart = product => ({
  type: ADD_ITEM_TO_SHOPPING_CART,
  data: product,
});

export const createLoadProducts = () => dispatch =>
  Xhr.get('/api/products').then(products => dispatch({
    type: PRODUCTS_LOADED,
    products,
  }));

export const createLoadProductCategories = () => dispatch =>
  Xhr.get('/api/productCategories').then(productCategories => dispatch({
    type: PRODUCT_CATEGORIES_LOADED,
    productCategories,
  }));

export const createLoadPublicProducers = () => dispatch =>
  Xhr.get('/api/publicproducers').then(producers => dispatch({
    type: PUBLIC_PRODUCERS_LOADED,
    producers,
  }));

export const createSetShoppingCartamount = (amount, product) => ({
  type: SET_SHOPPING_CART_AMOUNT,
  data: {
    amount,
    product,
  },
});

export const createRegistrationSuccessful = () => ({
  type: REGISTRATION_SUCCESSFUL,
});

export const createProcessingAuth = () => ({
  type: PROCESSING_AUTH,
});

export const createFinishedAuth = () => ({
  type: FINISHED_AUTH,
});

export const createResetFilter = () => (dispatch) => {
  dispatch({
    type: RESET_FILTER,
  });
  dispatch(reset(productFilterFormName));
};
