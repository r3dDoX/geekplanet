const ErrorTypes = {
  PaymentError: 'PaymentError',
};

function PaymentError(message, detail) {
  this.name = ErrorTypes.PaymentError;
  this.message = `${message} ${detail || ''}`;
}
PaymentError.prototype = Error.prototype;

module.exports = {
  ErrorTypes,
  PaymentError,
};
