window.onerror = (message, url, lineNo, colNo, error) => {
  console.log(arguments); // eslint-disable-line

  const container = document.createElement('div');

  container.style.color = 'red';
  container.style.position = 'fixed';
  container.style.background = '#eee';
  container.style.padding = '2em';
  container.style.top = '1em';
  container.style.left = '1em';
  container.style.zIndex = 99999;

  const msg = document.createElement('pre');
  msg.innerText = [
    `Message: ${message}`,
    `URL: ${url}`,
    `Line: ${lineNo}`,
    `Column: ${colNo}`,
    `Stack: ${error && error.stack}`,
  ].join('\n');

  container.appendChild(msg);

  document.body.appendChild(container);
};
