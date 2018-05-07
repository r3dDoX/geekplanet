import * as storage from './storage';
import AuthService from './auth/authService';

function setAuthHeader(req) {
  const jwtToken = storage.load(storage.ids.ID_TOKEN);
  if (jwtToken) {
    req.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
  }
}

function wrapXhrPromise(path, method, data, contentType) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener('load', () => {
      if (request.status === 200) {
        let { response } = request;
        try {
          response = JSON.parse(response);
        } catch (e) { /* Nothing to do when no JSON returned */ }
        resolve(response);
      } else if (request.status === 401) {
        AuthService.logout();
        window.location.assign('/login');
      } else {
        const { response } = request;
        try {
          reject(JSON.parse(response));
        } catch (e) {
          reject(response);
        }
      }
    });

    request.addEventListener('error', () => {
      reject();
    });

    request.open(method, path);
    setAuthHeader(request);
    if (contentType) {
      request.setRequestHeader('Content-Type', contentType);
    }
    request.send(data);
  });
}

function multipartRequest(path, method, data) {
  return wrapXhrPromise(path, method, data);
}

function jsonRequest(path, method, data) {
  return wrapXhrPromise(path, method, JSON.stringify(data), 'application/json');
}

export default {
  get(path) {
    return wrapXhrPromise(path, 'GET');
  },

  post(path, data, contentType) {
    return jsonRequest(path, 'POST', data, contentType);
  },

  postMultipart(path, multipartData) {
    return multipartRequest(path, 'POST', multipartData);
  },

  put(path, data) {
    return jsonRequest(path, 'PUT', data);
  },

  deleteHttp(path) {
    return wrapXhrPromise(path, 'DELETE');
  },
};
