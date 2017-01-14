import ActionTypes from '../actionTypes';

const initialState = {
  drawerOpened: false,
};

export default function auth(state = initialState, { type }) {
  switch (type) {
    case ActionTypes.TOGGLE_DRAWER:
      return Object.assign({}, state, {
        drawerOpened: !state.drawerOpened,
      });
    default:
      return state;
  }
}
