function addDashForNonDecimalNumbers(price) {
  const roundedPrice = Math.round(price * 20) / 20;

  if (roundedPrice - Math.floor(roundedPrice) === 0) {
    return `${roundedPrice}.-`;
  }

  return Number(roundedPrice).toFixed(2);
}

module.exports = {
  formatPriceWithCurrency: price => `CHF\u00a0${addDashForNonDecimalNumbers(price)}`,
  formatPriceWithoutCurrency: price => addDashForNonDecimalNumbers(price),
};
