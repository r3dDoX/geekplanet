import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import products from './products';
import forms from './forms';
import i18n from './i18n';
import auth from './auth';

export default combineReducers({
  products,
  forms,
  i18n,
  auth,
  routing: routerReducer,
});
