function addDashForNonDecimalNumbers(price) {
  const roundedPrice = Math.round(price * 20) / 20;

  if (roundedPrice - Math.floor(roundedPrice) === 0) {
    return `${roundedPrice}.-`;
  }

  return Number(roundedPrice).toFixed(2);
}

export const formatPriceWithCurrency = price => `CHF ${addDashForNonDecimalNumbers(price)}`;

export const formatPriceWithoutCurrency = price => addDashForNonDecimalNumbers(price);

export default formatPriceWithCurrency;
