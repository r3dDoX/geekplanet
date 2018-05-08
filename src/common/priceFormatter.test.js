const underTest = require('./priceFormatter');

describe('formatPriceWithoutCurrency', () => {
  it('should format price with two decimals in steps of five', () => {
    const price = 123.456;

    const result = underTest.formatPriceWithoutCurrency(price);

    expect(result).toBe('123.45');
  });

  it('should format price with dash when round', () => {
    const price = 456;

    const result = underTest.formatPriceWithoutCurrency(price);

    expect(result).toBe('456.-');
  });
});

describe('formatPriceWithCurrency', () => {
  it('should format price with CHF in front', () => {
    const price = 456;

    const result = underTest.formatPriceWithCurrency(price);

    expect(result).toBe('CHF\u00a0456.-');
  });
});
