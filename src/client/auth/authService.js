import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';
import * as storage from '../storage';

const clientId = AUTH.CLIENT_ID;
const domain = 'geekplanet.eu.auth0.com';

const AuthService = {
  init() {
    this.auth0 = new auth0.WebAuth({
      domain,
      clientID: clientId,
      redirectUri: AUTH.REDIRECT_URL,
      responseType: 'token id_token',
      scope: 'openid email',
    });
  },

  authorize(connection) {
    this.auth0.authorize({
      connection,
    });
  },

  signUp(email, password) {
    return new Promise((resolve, reject) =>
      this.auth0.signup({
        connection: 'Username-Password-Authentication',
        email,
        password,
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }));
  },

  login(username, password) {
    return new Promise((resolve, reject) =>
      this.auth0.client.login({
        realm: 'Username-Password-Authentication',
        username,
        password,
      }, (err, authResult) => {
        if (err) {
          reject(err);
        } else {
          authResult.idTokenPayload = jwtDecode(authResult.idToken);
          this.setSession(authResult);
          resolve(authResult.idTokenPayload);
        }
      }));
  },

  resetPassword(email) {
    return new Promise((resolve, reject) =>
      this.auth0.changePassword({
        connection: 'Username-Password-Authentication',
        email,
      }, (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve();
        }
      }),
    );
  },

  isExpired() {
    return new Date().getTime() > storage.load(storage.ids.TOKEN_EXPIRES_AT);
  },

  loggedIn() {
    const token = storage.load(storage.ids.ID_TOKEN);

    if (token) {
      if (!this.isExpired()) {
        return true;
      }

      this.logout();
    }

    return false;
  },

  logout() {
    storage.remove(storage.ids.ID_TOKEN);
    storage.remove(storage.ids.ACCESS_TOKEN);
    storage.remove(storage.ids.TOKEN_EXPIRES_AT);
  },

  handleAuthentication(dispatchLoggedIn) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        dispatchLoggedIn(authResult.idTokenPayload);
      }
    });
  },

  setSession(authResult) {
    storage.store(storage.ids.TOKEN_PAYLOAD, authResult.idTokenPayload);
    storage.store(storage.ids.ACCESS_TOKEN, authResult.accessToken);
    storage.store(storage.ids.ID_TOKEN, authResult.idToken);
    storage.store(
      storage.ids.TOKEN_EXPIRES_AT,
      (authResult.expiresIn * 1000) + new Date().getTime(),
    );
  },
};

export default AuthService;
