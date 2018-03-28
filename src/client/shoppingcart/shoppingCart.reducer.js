import shortId from 'shortid';
import { load, store, remove, ids } from '../storage';
import {
  ADD_COUPON_TO_SHOPPING_CART,
  ADD_ITEM_TO_SHOPPING_CART,
  LOAD_SHOPPING_CART,
  ORDER_FINISHED,
  PRODUCTS_LOADED,
  REMOVE_COUPON_FROM_SHOPPING_CART,
  SET_SHOPPING_CART_AMOUNT,
} from '../actions';
import PriceCalculation from '../../common/priceCalculation';

const priceCalculation = PriceCalculation.create(ORDER.MIN_PRICE_SHIPPING, ORDER.SHIPPING_COST);

const initialState = {
  id: shortId.generate(),
  items: [],
  coupons: [],
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

export default function auth(state = initialState, { type, data, products }) {
  switch (type) {
    case PRODUCTS_LOADED: {
      const cart = Object.assign({}, initialState, load(ids.SHOPPING_CART)) || state;

      cart.items = cart.items
        .filter(({ product }) =>
          products.some(loadedProduct => loadedProduct._id === product._id)
        )
        .map((item) => {
          item.product = Object.assign(item.product, products.find(
            product => product._id === item.product._id)
          );
          return item;
        });
      cart.itemTotal = priceCalculation.calculateItemTotal(cart.items);
      cart.total = priceCalculation.calculateGrandTotal(cart.itemTotal, cart.coupons);

      store(ids.SHOPPING_CART, cart);

      return cart;
    }
    case LOAD_SHOPPING_CART: {
      const cart = Object.assign({}, initialState, load(ids.SHOPPING_CART)) || state;

      if (!shortId.isValid(cart.id)) {
        cart.id = shortId.generate();
        store(ids.SHOPPING_CART, cart);
      }

      return cart;
    }
    case ADD_ITEM_TO_SHOPPING_CART: {
      const items = insertOrUpdateItem(state.items, data);
      const itemTotal = priceCalculation.calculateItemTotal(items);
      const newState = Object.assign({}, state, {
        items,
        itemTotal,
        total: priceCalculation.calculateGrandTotal(itemTotal, state.coupons),
        hasShippingCosts: priceCalculation.isInShippingCostRange(itemTotal),
      });

      store(ids.SHOPPING_CART, newState);

      return newState;
    }
    case ADD_COUPON_TO_SHOPPING_CART: {
      let newCoupons = state.coupons;
      if (!newCoupons.some(coupon => coupon._id === data._id)) {
        newCoupons = newCoupons.concat(data);
      }

      const newState = Object.assign({}, state, {
        coupons: newCoupons,
        total: priceCalculation.calculateGrandTotal(state.itemTotal, newCoupons),
      });

      store(ids.SHOPPING_CART, newState);

      return newState;
    }
    case REMOVE_COUPON_FROM_SHOPPING_CART: {
      const newCoupons = state.coupons.filter(coupon => coupon._id !== data);
      const newState = Object.assign({}, state, {
        coupons: newCoupons,
        total: priceCalculation.calculateGrandTotal(state.itemTotal, newCoupons),
      });

      store(ids.SHOPPING_CART, newState);

      return newState;
    }
    case SET_SHOPPING_CART_AMOUNT: {
      const items = insertOrUpdateItem(state.items, data.product, data.amount);
      const itemTotal = priceCalculation.calculateItemTotal(items);
      const newState = Object.assign({}, state, {
        items,
        itemTotal,
        total: priceCalculation.calculateGrandTotal(itemTotal, state.coupons),
        hasShippingCosts: priceCalculation.isInShippingCostRange(itemTotal),
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
