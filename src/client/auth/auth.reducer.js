import { FINISHED_AUTH, LOGGED_IN, LOGGED_OUT, PROCESSING_AUTH, REGISTRATION_SUCCESSFUL } from '../actions';

const initialState = {
  registrationSuccessful: undefined,
  email: undefined,
  loggedIn: false,
  roles: [],
  isAuthenticating: false,
};

export default function auth(state = initialState, { type, profile }) {
  switch (type) {
    case PROCESSING_AUTH:
      return Object.assign({}, state, {
        isAuthenticating: true,
      });
    case FINISHED_AUTH:
      return Object.assign({}, state, {
        isAuthenticating: false,
      });
    case LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: true,
        email: profile.email,
        roles: profile.roles,
        registrationSuccessful: undefined,
        isAuthenticating: false,
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
        isAuthenticating: false,
      });
    default:
      return state;
  }
}
