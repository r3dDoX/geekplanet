import { combineReducers } from 'redux';
import products from '../products/products.reducer';
import forms from '../admin/forms/forms.reducer';
import i18n from '../i18n/i18n.reducer';
import auth from '../auth/auth.reducer';
import layout from '../layout/layout.reducer';
import shoppingCart from '../shoppingcart/shoppingCart.reducer';

export default combineReducers({
  products,
  forms,
  i18n,
  auth,
  layout,
  shoppingCart,
});
