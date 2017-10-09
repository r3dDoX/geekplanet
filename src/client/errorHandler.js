import Xhr from './xhr';

window.onerror = (message, url, lineNo, colNo, error) => {
  Xhr.post('/api/error/log', {
    message,
    url,
    lineNo,
    colNo,
    error,
  }).then(() => {}, () => {});
  const msg = document.createElement('pre');
  msg.innerText = [
    `Message: ${message}`,
    `URL: ${url}`,
    `Line: ${lineNo}`,
    `Column: ${colNo}`,
    `Stack: ${error && error.stack}`,
  ].join('\n');
};
