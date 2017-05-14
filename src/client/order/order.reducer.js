import { ADDRESSES_LOADED, ORDER_FINISHED, SAVE_ADDRESS, SELECT_ADDRESS, SELECT_ORDER_STEP } from '../actions';

export const OrderSteps = {
  ADDRESS: 0,
  PAYMENT: 1,
  CONFIRMATION: 2,
};

const initialState = {
  address: undefined,
  addresses: [],
  selectedAddress: undefined,
  step: OrderSteps.ADDRESS,
};

export default function auth(state = initialState, { type, data }) {
  switch (type) {
    case SAVE_ADDRESS: {
      return Object.assign({}, state, {
        address: data,
        step: OrderSteps.PAYMENT,
      });
    }
    case ADDRESSES_LOADED: {
      return Object.assign({}, state, {
        addresses: data,
      });
    }
    case SELECT_ADDRESS: {
      return Object.assign({}, state, {
        selectedAddress: data,
      });
    }
    case ORDER_FINISHED: {
      return Object.assign({}, state, {
        step: OrderSteps.CONFIRMATION,
      });
    }
    case SELECT_ORDER_STEP: {
      return Object.assign({}, state, {
        step: data,
      });
    }
    default: {
      return state;
    }
  }
}
