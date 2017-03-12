import shortId from 'shortid';
import ActionTypes from '../actionTypes';
import { load, store, ids } from '../storage';

const initialState = {
  id: shortId.generate(),
  items: [],
};

function updateItem(item, id, amount) {
  if (item.product._id === id) {
    if (amount) {
      item.amount = amount;
    } else {
      item.amount += 1;
    }
  }

  return item;
}

function insertOrUpdateItem(items, product, amount) {
  if (amount === 0) {
    return items.filter(item => item.product._id !== product._id);
  }

  if (items.some(item => item.product._id === product._id)) {
    return items.map(item => updateItem(item, product._id, amount));
  }

  return items.concat({
    product,
    amount: 1,
  });
}

export default function auth(state = initialState, { type, data }) {
  switch (type) {
    case ActionTypes.LOAD_SHOPPING_CART: {
      const cart = load(ids.SHOPPING_CART) || state;

      if (!shortId.isValid(cart.id)) {
        cart.id = shortId.generate();
        store(ids.SHOPPING_CART, cart);
      }

      return cart;
    }
    case ActionTypes.ADD_ITEM_TO_SHOPPING_CART: {
      state.items = insertOrUpdateItem(state.items, data);
      const newState = Object.assign({}, state);

      store(ids.SHOPPING_CART, newState);

      return newState;
    }
    case ActionTypes.REMOVE_ITEM_FROM_SHOPPING_CART: {
      const filteredItems = state.items.filter(item => item.product._id !== data._id);

      store(ids.SHOPPING_CART, filteredItems);

      return filteredItems;
    }
    case ActionTypes.SET_AMOUNT: {
      state.items = insertOrUpdateItem(state.items, data.product, data.amount);
      const newState = Object.assign({}, state)

      store(ids.SHOPPING_CART, newState);

      return newState;
    }
    default: {
      return state;
    }
  }
}
