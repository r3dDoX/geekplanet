import auth0 from 'auth0-js';
import * as storage from '../storage';
import jwtDecode from 'jwt-decode';

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

  signup(email, password, dispatchSignedUp) {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, (err) => {
      if (err) {
        console.error(err);
      } else {
        dispatchSignedUp();
      }
    });
  },

  login(username, password, dispatchLoggedIn) {
    this.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password,
    }, (err, authResult) => {
      if (err) {
        console.error(err);
      } else {
        authResult.idTokenPayload = jwtDecode(authResult.idToken);
        this.setSession(authResult);
        dispatchLoggedIn(authResult.idTokenPayload);
      }
    });
  },

  loggedIn() {
    const token = storage.load(storage.ids.ID_TOKEN);

    if (token) {
      if (!new Date().getTime() < storage.load(storage.ids.TOKEN_EXPIRES_AT)) {
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

  setAccessToken(accessToken) {
    storage.store(storage.ids.ACCESS_TOKEN, accessToken);
  },

  getAccessToken() {
    return storage.load(storage.ids.ACCESS_TOKEN);
  },

  handleAuthentication(dispatchLoggedIn) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        dispatchLoggedIn(authResult.idTokenPayload);
      } else if (err) {
        console.error(err);
      }
    });
  },

  setSession(authResult) {
    storage.store(storage.ids.TOKEN_PAYLOAD, authResult.idTokenPayload);
    storage.store(storage.ids.ACCESS_TOKEN, authResult.accessToken);
    storage.store(storage.ids.ID_TOKEN, authResult.idToken);
    storage.store(
      storage.ids.TOKEN_EXPIRES_AT,
      (authResult.expiresIn * 1000) + new Date().getTime()
    );
  },
};

export default AuthService;
