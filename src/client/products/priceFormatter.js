function addDashForNonDecimalNumbers(price) {
  if (price - Math.floor(price) === 0) {
    return `${price}.-`;
  }

  return price;
}

export const formatPriceWithCurrency = price => `CHF ${addDashForNonDecimalNumbers(price)}`;

export const formatPriceWithoutCurrency = price => addDashForNonDecimalNumbers(price);

export default formatPriceWithCurrency;
