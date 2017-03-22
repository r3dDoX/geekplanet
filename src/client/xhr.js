import * as storage from './storage';

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
        let response = request.response;
        try {
          response = JSON.parse(response);
        } catch (e) { /* Nothing to do when no JSON returned*/ }
        resolve(response);
      } else {
        reject();
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
    request.send(JSON.stringify(data));
  });
}

export default {
  get(path) {
    return wrapXhrPromise(path, 'GET');
  },

  post(path, data, contentType) {
    return wrapXhrPromise(path, 'POST', data, contentType);
  },

  put(path, data, contentType) {
    return wrapXhrPromise(path, 'PUT', data, contentType);
  },

  deleteHttp(path) {
    return wrapXhrPromise(path, 'DELETE');
  },
};
