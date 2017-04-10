const underTest = require('./esrCodeHelpers');

describe('spaceReference', () => {
  test('should add a space every 5 chars from right', () => {
    const result = underTest.spaceReference('000005039981000000000000018');

    expect(result).toBe('00 00050 39981 00000 00000 00018');
  });
});
