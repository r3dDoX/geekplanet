import { COUPONS_LOADED, ORDERS_LOADED } from '../actions';

const initialState = {
  orders: [],
  coupons: [],
};

export default (state = initialState, { type, orders, coupons }) => {
  switch (type) {
    case ORDERS_LOADED:
      return Object.assign({}, state, {
        orders,
      });
    case COUPONS_LOADED:
      return Object.assign({}, state, {
        coupons,
      });
    default:
      return state;
  }
};
