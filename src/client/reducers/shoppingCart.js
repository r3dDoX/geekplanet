import ActionTypes from '../actionTypes';
import { load, store, ids } from '../storage';

const initialState = [];

function insertOrUpdateItem(state, product) {
  if (state.some(item => item.product._id === product._id)) {
    return state.map((item) => {
      if (item.product._id === product._id) {
        const newItem = item;
        newItem.amount += 1;
        return newItem;
      }

      return item;
    });
  }

  return state.concat({
    product,
    amount: 1,
  });
}
export default function auth(state = initialState, { type, data }) {
  switch (type) {
    case ActionTypes.LOAD_SHOPPING_CART: {
      return load(ids.SHOPPING_CART) || state;
    }
    case ActionTypes.ADD_ITEM_TO_SHOPPING_CART: {
      const newState = insertOrUpdateItem(state, data._id);

      store(ids.SHOPPING_CART, newState);

      return newState;
    }
    case ActionTypes.REMOVE_ITEM_FROM_SHOPPING_CART: {
      const filteredState = state.filter(item => item.product._id !== data._id);

      store(ids.SHOPPING_CART, filteredState);

      return filteredState;
    }
    case ActionTypes.SET_AMOUNT: {
      return state.map((item) => {
        if (item.product._id === data.product._id) {
          item.amount = data.amount;
          store(ids.SHOPPING_CART, state);
        }
        return item;
      });
    }
    default: {
      return state;
    }
  }
}
