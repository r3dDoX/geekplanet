import ActionTypes from '../actionTypes';

const initialState = {
  drawerOpened: false,
  shoppingCartNotification: false,
};

export default function auth(state = initialState, { type }) {
  switch (type) {
    case ActionTypes.TOGGLE_DRAWER:
      return Object.assign({}, state, {
        drawerOpened: !state.drawerOpened,
      });
    case ActionTypes.ADD_ITEM_TO_SHOPPING_CART:
      return Object.assign({}, state, {
        shoppingCartNotification: true,
      });
    case ActionTypes.HIDE_SHOPPING_CART_NOTIFICATION:
      return Object.assign({}, state, {
        shoppingCartNotification: false,
      });
    default:
      return state;
  }
}
