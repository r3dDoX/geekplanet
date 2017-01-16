import ActionTypes from '../actionTypes';
import { load, store, ids } from '../storage';

const initialState = [];

const increaseAmount = (state, data) => state.map((item) => {
  if (item.product._id === data._id) {
    const newItem = item;
    newItem.amount += 1;
    return newItem;
  }

  return item;
});

export default function auth(state = initialState, { type, data }) {
  switch (type) {
    case ActionTypes.LOAD_SHOPPING_CART:
      return load(ids.SHOPPING_CART) || state;
    case ActionTypes.ADD_ITEM_TO_SHOPPING_CART: {
      let newState;

      if (state.some(item => item.product._id === data._id)) {
        newState = increaseAmount(state, data);
      } else {
        newState = state.concat({
          product: data,
          amount: 1,
        });
      }

      store(ids.SHOPPING_CART, newState);

      return newState;
    }
    case ActionTypes.REMOVE_ITEM_FROM_SHOPPING_CART: {
      const filteredState = state.filter(item => item.product._id !== data._id);

      store(ids.SHOPPING_CART, filteredState);

      return filteredState;
    }
    default:
      return state;
  }
}
