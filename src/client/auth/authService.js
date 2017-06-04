import auth0 from 'auth0-js';
import * as storage from '../storage';

const clientId = AUTH.CLIENT_ID;
const domain = 'geekplanet.eu.auth0.com';

const AuthService = {
  login() {
    this.auth0.authorize();
  },

  loggedIn() {
    const token = this.getToken();

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

  setToken(idToken) {
    storage.store(storage.ids.ID_TOKEN, idToken);
  },

  getToken() {
    return storage.load(storage.ids.ID_TOKEN);
  },

  setAccessToken(accessToken) {
    storage.store(storage.ids.ACCESS_TOKEN, accessToken);
  },

  getAccessToken() {
    return storage.load(storage.ids.ACCESS_TOKEN);
  },

  getUserInfo() {
    return new Promise((resolve, reject) =>
      this.lock.getUserInfo(this.getAccessToken(), (error, profile) => {
        if (error) {
          reject(error);
        } else {
          resolve(profile);
        }
      }),
    );
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

AuthService.auth0 = new auth0.WebAuth({
  domain,
  clientID: clientId,
  redirectUri: AUTH.REDIRECT_URL,
  responseType: 'token id_token',
  scope: 'openid email',
});

export default AuthService;
