import Xhr from './xhr';

window.onerror = (message, url, lineNo, colNo, error) => {
  Xhr.post('/api/error/log', {
    message,
    url,
    lineNo,
    colNo,
    error,
  }).then(() => {}, () => {});
};
