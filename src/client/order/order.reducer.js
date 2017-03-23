import ActionTypes from '../actionTypes';

const initialState = {
  address: undefined,
  addresses: [],
  selectedAddress: undefined,
  step: 0,
};

export default function auth(state = initialState, { type, data }) {
  switch (type) {
    case ActionTypes.SAVE_ADDRESS: {
      return Object.assign({}, state, {
        address: data,
        step: 1,
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
        step: 2,
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
