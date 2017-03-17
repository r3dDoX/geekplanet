import * as storage from './storage';

const setAuthHeader = (req) => {
  const jwtToken = storage.load(storage.ids.ID_TOKEN);
  if (jwtToken) {
    req.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
  }
};

export default {
  get(path) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.addEventListener('load', () => {
        if (request.status === 200) {
          resolve(JSON.parse(request.response));
        } else {
          reject();
        }
      });

      request.open('GET', path);
      setAuthHeader(request);
      request.send();
    });
  },

  post(path, data, contentType) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.addEventListener('load', () => {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject();
        }
      });

      request.addEventListener('error', () => {
        reject();
      });

      request.open('POST', path);
      setAuthHeader(request);
      if (contentType) {
        request.setRequestHeader('Content-Type', contentType);
      }
      request.send(data);
    });
  },

  deleteHttp(path) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();


      request.addEventListener('load', () => {
        if (request.status === 200) {
          resolve();
        } else {
          reject();
        }
      });

      request.addEventListener('error', () => {
        reject();
      });

      request.open('DELETE', path);
      setAuthHeader(request);
      request.send();
    });
  },
};
