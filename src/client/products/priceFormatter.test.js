import * as underTest from './priceFormatter';

describe('formatPriceWithoutCurrency', () => {
  test('should format price with two decimals in steps of five', () => {
    const price = 123.456;

    const result = underTest.formatPriceWithoutCurrency(price);

    expect(result).toBe('123.45');
  });

  test('should format price with dash when round', () => {
    const price = 456;

    const result = underTest.formatPriceWithoutCurrency(price);

    expect(result).toBe('456.-');
  });
});

describe('formatPriceWithCurrency', () => {
  test('should format price with CHF in front', () => {
    const price = 456;

    const result = underTest.formatPriceWithCurrency(price);

    expect(result).toBe('CHF 456.-');
  });
});
