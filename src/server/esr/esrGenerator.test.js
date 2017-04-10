const underTest = require('./esrGenerator');
const pdffiller = require('pdffiller');

pdffiller.fillForm = jest.fn().mockImplementation(pdffiller.fillForm);

describe('generate', () => {
  test('should generate 12 digit code out of price with checkdigit', () => {
    const orderNumber = 'testOrderNumber';
    const price = 498.25;
    const address = {
      firstName: 'firstName',
      lastName: 'lastName',
      streetAddress: 'streetAddress',
      zip: 'zip',
      city: 'city',
    };

    underTest.generate(5, orderNumber, price, address);

    expect(pdffiller.fillForm.mock.calls.length).toBe(1);
    const callArguments = pdffiller.fillForm.mock.calls[0];
    expect(callArguments[2]).toEqual({
      address_1: `${address.firstName} ${address.lastName}
${address.streetAddress}
${address.zip} ${address.city}`,
      address_2: `${address.firstName} ${address.lastName}
${address.streetAddress}
${address.zip} ${address.city}`,
      decimal_1: '25',
      decimal_2: '25',
      esr_code: '0100000498259>000005039981000000000000055+ 012000998>',
      reference: '00 00050 39981 00000 00000 00055',
      reference_small: '000005039981000000000000055',
      value_1: 498,
      value_2: 498,
    });
  });
});
