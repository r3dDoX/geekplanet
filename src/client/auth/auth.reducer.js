import { AUTH_SERVICE_CREATED, LOGGED_IN, LOGGED_OUT, PROFILE_LOADED } from '../actions';

const initialState = {
  authService: undefined,
  email: undefined,
  loggedIn: false,
  roles: [],
};

export default function auth(state = initialState, { type, authService, profile }) {
  switch (type) {
    case AUTH_SERVICE_CREATED:
      return Object.assign({}, state, { authService });
    case LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: true,
      });
    case PROFILE_LOADED:
      return Object.assign({}, state, {
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
