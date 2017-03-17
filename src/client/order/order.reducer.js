import ActionTypes from '../actionTypes';

const initialState = {
  address: undefined,
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
    default: {
      return state;
    }
  }
}
