import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import products from './products';
import forms from './forms';

export default combineReducers({
  products,
  forms,
  routing: routerReducer,
});
