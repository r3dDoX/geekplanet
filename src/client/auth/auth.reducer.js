import { LOGGED_IN, LOGGED_OUT } from '../actions';

const initialState = {
  email: undefined,
  loggedIn: false,
  roles: [],
};

export default function auth(state = initialState, { type, profile }) {
  switch (type) {
    case LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: true,
        email: profile.email,
        roles: profile.roles,
      });
    case LOGGED_OUT:
      return Object.assign({}, state, {
        loggedIn: false,
        email: initialState.email,
        roles: initialState.roles,
      });
    default:
      return state;
  }
}
