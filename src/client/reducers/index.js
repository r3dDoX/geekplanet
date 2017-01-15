import { combineReducers } from 'redux';
import products from './products';
import forms from './forms';
import i18n from './i18n';
import auth from './auth';
import layout from './layout';
import shoppingCart from './shoppingCart';

export default combineReducers({
  products,
  forms,
  i18n,
  auth,
  layout,
  shoppingCart,
});
