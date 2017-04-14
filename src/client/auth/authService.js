import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import * as storage from '../storage';
import { brandSecondary } from '../theme';

const clientId = AUTH.CLIENT_ID;
const domain = 'geekplanet.eu.auth0.com';

const tokenIsExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return new Date(0).setUTCSeconds(decodedToken.exp) < new Date();
  } catch (e) {
    return true;
  }
};

const Prototype = {
  login() {
    this.lock.show();
  },
  loggedIn() {
    const token = this.getToken();

    if (token) {
      if (!tokenIsExpired(token)) {
        return true;
      }

      this.logout();
    }

    return false;
  },
  logout() {
    storage.remove(storage.ids.ID_TOKEN);
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
      })
    );
  },
};

export default {
  create(language, onLoggedIn) {
    const obj = Object.create(Prototype);

    obj.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: AUTH.REDIRECT_URL,
        responseType: 'token',
        params: {
          scope: 'openid user_id email app_metadata',
        },
      },
      language,
      languageDictionary: {
        title: '',
      },
      theme: {
        logo: '/assets/images/logo.svg',
        primaryColor: brandSecondary,
      },
    });

    // Add callback for lock `authenticated` event
    obj.lock.on('authenticated', (authResult) => {
      obj.setToken(authResult.idToken);
      obj.setAccessToken(authResult.accessToken);
      onLoggedIn(obj);

      // navigate to the home route
      browserHistory.replace('/');
    });

    return obj;
  },
};

