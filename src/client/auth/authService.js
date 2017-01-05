import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

const clientId = AUTH.CLIENT_ID;
const domain = 'geekplanet.eu.auth0.com';

const tokenIsExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return new Date(0).setUTCSeconds(decodedToken.exp) < new Date();
  } catch (e) {
    console.error(e);
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
    localStorage.removeItem('id_token');
  },
  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  },
  getToken() {
    return localStorage.getItem('id_token');
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
          scope: 'openid email app_metadata',
        },
      },
      language,
    });

    // Add callback for lock `authenticated` event
    obj.lock.on('authenticated', (authResult) => {
      obj.setToken(authResult.idToken);

      obj.lock.getUserInfo(authResult.accessToken, (error, profile) => onLoggedIn(profile));

      // navigate to the home route
      browserHistory.replace('/');
    });

    return obj;
  },
};

