import { ORDERS_LOADED } from './adminActions';

const initialState = {
  orders: [],
};

export default (state = initialState, { type, orders }) => {
  switch (type) {
    case ORDERS_LOADED:
      return Object.assign({}, state, {
        orders,
      });
    default:
      return state;
  }
};
