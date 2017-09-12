import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import products from '../products/products.reducer';
import forms from '../admin/forms/forms.reducer';
import i18n from '../i18n/i18n.reducer';
import auth from '../auth/auth.reducer';
import layout from '../layout/layout.reducer';
import shoppingCart from '../shoppingcart/shoppingCart.reducer';
import order from '../order/order.reducer';
import admin from '../admin/admin.reducer';
import home from '../home/home.reducer';

export default combineReducers({
  form: formReducer,
  products,
  i18n,
  auth,
  layout,
  shoppingCart,
  order,
  forms,
  admin,
  home,
});
