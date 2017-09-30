/* eslint-disable */

if (!Array.prototype.hasOwnProperty('flatMap')) {
  Object.defineProperty(Array.prototype, 'flatMap', {
    value(lambda) {
      return Array.prototype.concat.apply([], this.map(lambda));
    },
    writable: true,
    configurable: true,
    enumerable: false
  });
}
