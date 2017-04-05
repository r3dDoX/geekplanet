// @flow

const Logger = require('./../logger');
const pdfFiller = require('pdffiller');
const esrTemplate = `${__dirname}/ESR_Form.pdf`;

module.exports = {
  generate() {
    const destinationPDF = './invoices/test_complete.pdf';
    const formData = {
      value_1: '400',
      decimal_1: '00',
      value_2: '400',
      decimal_2: '00',
      reference: '96 11169 00000 00660 00000 09284',
      reference_small: '961116900000006600000009284',
      address_1: 'UTF-8Täst\nTüststrasse 2B\n5000 Önsé',
      address_2: 'UTF-8Täst\nTüststrasse 2B\n5000 Önsé',
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
