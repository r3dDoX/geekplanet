import * as underTest from './esrCodeHelpers';

describe('generateValueCode', () => {
  it('should generate 12 digit code out of price with checkdigit', () => {
    const price = 498.25;

    const result = underTest.generateValueCode(price);

    expect(result).toBe('0100000498259');
  });

  it('should pad price with zeros when no decimal', () => {
    const price = 123;

    const result = underTest.generateValueCode(price);

    expect(result).toBe('0100000123009');
  });
});

describe('generateInvoiceNumberCode', () => {
  it('should pad invoice number with zeros and calculate checkdigit', () => {
    const result = underTest.generateInvoiceNumberCode(524);

    expect(result).toBe('000005039981000000000005247');
  });
});

describe('spaceReference', () => {
  it('should add a space every 5 chars from right', () => {
    const result = underTest.spaceReference('000005039981000000000000018');

    expect(result).toBe('00 00050 39981 00000 00000 00018');
  });
});
