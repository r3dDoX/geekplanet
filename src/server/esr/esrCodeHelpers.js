const checkDigitAlg = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];

module.exports = {
  generateValueCode(value /* : number */) {
    const bt = `0000000000${Math.round(value * 100)}`;
    const bb = `01${bt.substr(bt.length - 10)}`;

    const checkDigit = bb.split('').reduce(
      (sum, currentValue) => checkDigitAlg[(sum + parseInt(currentValue, 10)) % 10],
      0
    );

    return bb + ((10 - checkDigit) % 10);
  },

  generateInvoiceNumberCode(invoiceNumber /* : number */) {
    const invoiceString = `00000000000000${invoiceNumber}`;
    const rg = `000005039981${invoiceString.substr(invoiceString.length - 14)}`;
    const ro = rg.split('').reduce(
      (sum, currentValue) => checkDigitAlg[(sum + parseInt(currentValue, 10)) % 10],
      0
    );

    return rg + ((10 - ro) % 10);
  },

  spaceReference(reference /* : string */) {
    return reference.split('').reduceRight(
      (accString, actChar, index) => {
        if (index % 5 === 1) {
          return `${actChar} ${accString}`;
        }
        return actChar + accString;
      },
      ''
    ).trimRight();
  },
};
