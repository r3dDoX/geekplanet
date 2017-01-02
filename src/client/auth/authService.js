import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';

const Prototype = {
  login() {
    this.lock.show();
  },
  loggedIn() {
    return !!this.getToken();
  },
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  },
  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  },
  getToken() {
    return localStorage.getItem('id_token');
  },
  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  },
  getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  },
};

export default {
  create(clientId, domain, language, onLoggedIn) {
    const obj = Object.create(Prototype);

    obj.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: AUTH.REDIRECT_URL,
        responseType: 'token',
      },
      language,
    });

    // Add callback for lock `authenticated` event
    obj.lock.on('authenticated', (authResult) => {
      obj.setToken(authResult.idToken);
      onLoggedIn();

      obj.lock.getUserInfo(authResult.accessToken, (error, profile) => obj.setProfile(profile));

      // navigate to the home route
      browserHistory.replace('/');
    });

    return obj;
  },
};

