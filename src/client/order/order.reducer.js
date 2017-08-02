import {
  ADDRESSES_LOADED, ORDER_FINISHED, PROCESSING_STARTED, SAVE_ADDRESS, SELECT_ADDRESS,
  SELECT_ORDER_STEP,
} from '../actions';

export const OrderSteps = {
  ADDRESS: 'address',
  PAYMENT: 'payment',
  CONFIRMATION: 'confirmation',
};

const initialState = {
  address: undefined,
  addresses: [],
  selectedAddress: undefined,
  step: OrderSteps.ADDRESS,
  processing: false,
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
        processing: false,
      });
    }
    case SELECT_ORDER_STEP: {
      return Object.assign({}, state, {
        step: data,
      });
    }
    case PROCESSING_STARTED: {
      return Object.assign({}, state, {
        processing: true,
      });
    }
    default: {
      return state;
    }
  }
}
