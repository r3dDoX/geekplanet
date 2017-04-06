// @flow

const Logger = require('./../logger');
const pdfFiller = require('pdffiller');
const esrTemplate = `${__dirname}/ESR_Form.pdf`;

module.exports = {
  generate(
    value /* : number */,
    address /* : any */
  ) {
    const destinationPDF = './invoices/test_complete.pdf';
    const decimalValue = Math.round((value % 1) * 100);
    const integerValue = Math.floor(value);
    const esrAddress = `${address.firstName} ${address.lastName}
${address.streetAddress}
${address.zip} ${address.city}`;

    const formData = {
      value_1: integerValue,
      decimal_1: decimalValue,
      value_2: integerValue,
      decimal_2: decimalValue,
      reference: '96 11169 00000 00660 00000 09284',
      reference_small: '961116900000006600000009284',
      address_1: esrAddress,
      address_2: esrAddress,
      esr_code: '2300000440009>961116900000006600000009284+ 030001625>',
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
