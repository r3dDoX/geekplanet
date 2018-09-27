/* eslint-disable no-eval */
const babel = require('@babel/core');

module.exports = function transformJsxModule(absolutePath) {
  const module = {};

  eval(babel.transformFileSync(absolutePath, { presets: ['@babel/preset-react'] }).code);

  return module.exports;
};
