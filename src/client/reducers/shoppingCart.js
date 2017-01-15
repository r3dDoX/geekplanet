import ActionTypes from '../actionTypes';

const initialState = [];

export default function auth(state = initialState, { type, data }) {
  switch (type) {
    case ActionTypes.ADD_ITEM_TO_SHOPPING_CART:
      if (state.some(item => item.product._id === data._id)) {
        return state.map((item) => {
          if (item.product._id === data._id) {
            const newItem = item;
            newItem.amount += 1;
            return newItem;
          }

          return item;
        });
      }

      return state.concat({
        product: data,
        amount: 1,
      });
    case ActionTypes.REMOVE_ITEM_FROM_SHOPPING_CART:
      return state.filter(item => item.product._id !== data._id);
    default:
      return state;
  }
}
