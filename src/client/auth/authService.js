import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';

export const Prototype = {
  login() {
    // Call the show method to display the widget.
    this.lock.show();
  },
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken();
  },
  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
  },
  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken);
  },
  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token');
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

      // navigate to the home route
      browserHistory.replace('/');
    });

    return obj;
  },
};

