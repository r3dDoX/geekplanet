import ActionTypes from '../actionTypes';

const initialState = {
  loggedIn: false,
  roles: [],
  authService: undefined,
};

export default function auth(state = initialState, { type, data }) {
  switch (type) {
    case ActionTypes.AUTH_SERVICE_CREATED:
      return Object.assign({}, state, {
        authService: data,
      });
    case ActionTypes.LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: true,
        email: data.email,
        roles: data.roles,
      });
    case ActionTypes.LOGGED_OUT:
      return Object.assign({}, state, {
        loggedIn: false,
      });
    default:
      return state;
  }
}
