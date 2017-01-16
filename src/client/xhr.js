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

  post(path, data) {
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

      request.open('POST', path);
      setAuthHeader(request);
      request.send(data);
    });
  },
};
