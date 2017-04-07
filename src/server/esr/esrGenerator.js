// @flow

const pdfFiller = require('pdffiller');
const Logger = require('./../logger');

const esrTemplate = `${__dirname}/ESR_Form.pdf`;

const checkDigitAlg = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];

function generateValueCode(value /* : number */) {
  const bt = `0000000000${Math.round(value * 100)}`;
  const bb = `01${bt.substr(bt.length - 10)}`;

  const checkDigit = bb.split('').reduce(
    (sum, currentValue) => checkDigitAlg[(sum + parseInt(currentValue, 10)) % 10],
    0
  );

  return bb + ((10 - checkDigit) % 10);
}

function generateInvoiceNumberCode(invoiceNumber /* : number */) {
  const invoiceString = `00000000000000${invoiceNumber}`;
  const rg = `000005039981${invoiceString.substr(invoiceString.length - 14)}`;
  const ro = rg.split('').reduce(
    (sum, currentValue) => checkDigitAlg[(sum + parseInt(currentValue, 10)) % 10],
    0
  );

  return rg + ((10 - ro) % 10);
}

function spaceReference(reference /* : string */) {
  return reference.split('').reduceRight(
    (accString, actChar, index) => {
      if (index < 25 && index % 5 === 1) {
        return `${actChar} ${accString}`;
      }
      return actChar + accString;
    },
    ''
  );
}

module.exports = {
  generate(
    invoiceNumber /* : number */,
    orderNumber /* : string */,
    value /* : number */,
    address /* : any */
  ) {
    const destinationPDF = `./invoices/${orderNumber}.pdf`;
    const decimalValue = Math.round((value % 1) * 100);
    const integerValue = Math.floor(value);
    const esrAddress = `${address.firstName} ${address.lastName}
${address.streetAddress}
${address.zip} ${address.city}`;
    const partnerNumber = '012000998';
    const reference = generateInvoiceNumberCode(invoiceNumber);

    const formData = {
      value_1: integerValue,
      decimal_1: decimalValue,
      value_2: integerValue,
      decimal_2: decimalValue,
      reference: spaceReference(reference),
      reference_small: reference,
      address_1: esrAddress,
      address_2: esrAddress,
      esr_code: `${generateValueCode(value)}>${reference}+ ${partnerNumber}>`,
    };

    return new Promise((resolve, reject) => {
      pdfFiller.fillForm(esrTemplate, destinationPDF, formData, (err) => {
        if (err) {
          Logger.error(err);
          reject(err);
        }
        resolve(destinationPDF);
      });
    });
  },
};
