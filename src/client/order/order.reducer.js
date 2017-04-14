import ActionTypes from '../actionTypes';

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
    case ActionTypes.SAVE_ADDRESS: {
      return Object.assign({}, state, {
        address: data,
        step: OrderSteps.PAYMENT,
      });
    }
    case ActionTypes.ADDRESSES_LOADED: {
      return Object.assign({}, state, {
        addresses: data,
      });
    }
    case ActionTypes.SELECT_ADDRESS: {
      return Object.assign({}, state, {
        selectedAddress: data,
      });
    }
    case ActionTypes.ORDER_FINISHED: {
      return Object.assign({}, state, {
        step: OrderSteps.CONFIRMATION,
      });
    }
    case ActionTypes.SELECT_ORDER_STEP: {
      return Object.assign({}, state, {
        step: data,
      });
    }
    default: {
      return state;
    }
  }
}
