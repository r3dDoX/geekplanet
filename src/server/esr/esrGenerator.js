// @flow

const pdfFiller = require('pdffiller');
const Logger = require('./../logger');
const esrCodeHelpers = require('./esrCodeHelpers');

const esrTemplate = `${__dirname}/ESR_Form.pdf`;

module.exports = {
  generate(
    reference /* : string */,
    orderNumber /* : string */,
    value /* : number */,
    address /* : any */
  ) {
    const destinationPDF = `./invoices/${orderNumber}.pdf`;
    const decimalString = `00${Math.round((value % 1) * 100)}`;
    const decimalValue = decimalString.substr(decimalString.length - 2);
    const integerValue = Math.floor(value);
    const esrAddress = `${address.firstName} ${address.lastName}
${address.streetAddress}
${address.zip} ${address.city}`;
    const partnerNumber = '012000998';
    const formData = {
      value_1: integerValue,
      decimal_1: decimalValue,
      value_2: integerValue,
      decimal_2: decimalValue,
      reference: esrCodeHelpers.spaceReference(reference),
      reference_small: reference,
      address_1: esrAddress,
      address_2: esrAddress,
      esr_code: `${esrCodeHelpers.generateValueCode(value)}>${reference}+ ${partnerNumber}>`,
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
