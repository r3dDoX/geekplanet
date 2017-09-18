import { HOME_TILES_LOADED } from '../actions';

const initialState = {
  tiles: [],
};

export default (state = initialState, { type, tiles }) => {
  switch (type) {
    case HOME_TILES_LOADED:
      return Object.assign({}, state, { tiles });
    default:
      return state;
  }
};
