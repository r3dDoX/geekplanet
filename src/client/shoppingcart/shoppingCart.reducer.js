import shortId from 'shortid';
import { load, store, remove, ids } from '../storage';
import {
  ADD_ITEM_TO_SHOPPING_CART, LOAD_SHOPPING_CART, ORDER_FINISHED, REMOVE_ITEM_FROM_SHOPPING_CART,
  SET_SHOPPING_CART_AMOUNT,
} from '../actions';

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
    case LOAD_SHOPPING_CART: {
      const cart = load(ids.SHOPPING_CART) || state;

      if (!shortId.isValid(cart.id)) {
        cart.id = shortId.generate();
        store(ids.SHOPPING_CART, cart);
      }

      return cart;
    }
    case ADD_ITEM_TO_SHOPPING_CART: {
      state.items = insertOrUpdateItem(state.items, data);
      const newState = Object.assign({}, state);

      store(ids.SHOPPING_CART, newState);

      return newState;
    }
    case REMOVE_ITEM_FROM_SHOPPING_CART: {
      const filteredItems = state.items.filter(item => item.product._id !== data._id);

      store(ids.SHOPPING_CART, filteredItems);

      return filteredItems;
    }
    case SET_SHOPPING_CART_AMOUNT: {
      state.items = insertOrUpdateItem(state.items, data.product, data.amount);
      const newState = Object.assign({}, state);

      store(ids.SHOPPING_CART, newState);

      return newState;
    }
    case ORDER_FINISHED: {
      remove(ids.SHOPPING_CART);
      return initialState;
    }
    default: {
      return state;
    }
  }
}
