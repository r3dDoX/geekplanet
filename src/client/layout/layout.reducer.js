import { ADD_ITEM_TO_SHOPPING_CART, HIDE_SHOPPING_CART_NOTIFICATION, TOGGLE_DRAWER } from '../actions';

const initialState = {
  drawerOpened: false,
  shoppingCartNotification: false,
};

export default function auth(state = initialState, { type }) {
  switch (type) {
    case TOGGLE_DRAWER:
      return Object.assign({}, state, {
        drawerOpened: !state.drawerOpened,
      });
    case ADD_ITEM_TO_SHOPPING_CART:
      return Object.assign({}, state, {
        shoppingCartNotification: true,
      });
    case HIDE_SHOPPING_CART_NOTIFICATION:
      return Object.assign({}, state, {
        shoppingCartNotification: false,
      });
    default:
      return state;
  }
}
