export default (price) => {
  let priceString = `CHF ${price}`;

  if (price - Math.floor(price) === 0) {
    priceString += '.-';
  }

  return priceString;
};
