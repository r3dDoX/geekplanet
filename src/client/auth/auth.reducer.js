import { LOGGED_IN, LOGGED_OUT, REGISTRATION_SUCCESSFUL } from '../actions';

const initialState = {
  registrationSuccessful: undefined,
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
        registrationSuccessful: undefined,
      });
    case LOGGED_OUT:
      return Object.assign({}, state, {
        loggedIn: false,
        email: initialState.email,
        roles: initialState.roles,
        registrationSuccessful: undefined,
      });
    case REGISTRATION_SUCCESSFUL:
      return Object.assign({}, state, {
        registrationSuccessful: true,
      });
    default:
      return state;
  }
}
