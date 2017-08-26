import shortId from 'shortid';
import { load, store, remove, ids } from '../storage';
import {
  ADD_ITEM_TO_SHOPPING_CART, LOAD_SHOPPING_CART, ORDER_FINISHED,
  SET_SHOPPING_CART_AMOUNT,
} from '../actions';

const initialState = {
  id: shortId.generate(),
  items: [],
  itemTotal: 0,
  total: 0,
  hasShippingCosts: false,
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

function calculateItemTotal(items) {
  return items.reduce(
    (sum, { amount, product }) => ((sum * 100) + (product.price * amount * 100)) / 100,
    0
  );
}

function isInShippingCostRange(price) {
  return price > 0 && price < ORDER.MIN_PRICE_SHIPPING;
}

function calculateGrandTotal(itemTotal) {
  if (isInShippingCostRange(itemTotal)) {
    return itemTotal + ORDER.SHIPPING_COST;
  }

  return itemTotal;
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
      const items = insertOrUpdateItem(state.items, data);
      const itemTotal = calculateItemTotal(items);
      const newState = Object.assign({}, state, {
        items,
        itemTotal,
        total: calculateGrandTotal(itemTotal),
        hasShippingCosts: isInShippingCostRange(itemTotal),
      });

      store(ids.SHOPPING_CART, newState);

      return newState;
    }
    case SET_SHOPPING_CART_AMOUNT: {
      const items = insertOrUpdateItem(state.items, data.product, data.amount);
      const itemTotal = calculateItemTotal(items);
      const newState = Object.assign({}, state, {
        items,
        itemTotal,
        total: calculateGrandTotal(itemTotal),
        hasShippingCosts: isInShippingCostRange(itemTotal),
      });

      store(ids.SHOPPING_CART, newState);

      return newState;
    }
    case ORDER_FINISHED: {
      remove(ids.SHOPPING_CART);
      return Object.assign({}, initialState, {
        id: shortId.generate(),
      });
    }
    default: {
      return state;
    }
  }
}
