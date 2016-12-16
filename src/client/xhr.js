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
      request.send(data);
    });
  },
};
