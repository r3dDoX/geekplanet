// @flow

const fs = require('fs');
const nodemailer = require('nodemailer');
const secretConfig = require('../config/secret.config.json');
const Logger = require('./logger');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER || secretConfig.SMTP_SERVER,
  port: 587,
  auth: {
    user: process.env.SMTP_USER || secretConfig.SMTP_USER,
    pass: process.env.SMTP_PASSWORD || secretConfig.SMTP_PASSWORD,
  },
});

module.exports = {
  sendESR(
    orderNumber /* : string */,
    userEmail /* : string */,
    pdfPath /* : string */
  ) {
    return new Promise((resolve, reject) =>
      transporter.sendMail({
        from: process.env.SMTP_USER || secretConfig.SMTP_USER,
        to: userEmail,
        subject: 'Order Test',
        text: 'Invoice from geekplanet',
        html: `<h1>Order Nr. ${orderNumber}</h1>`,
        attachments: [
          {
            filename: `${orderNumber}.pdf`,
            content: fs.createReadStream(pdfPath),
          },
        ],
      }, (err) => {
        if (err) {
          Logger.error(err);
          reject();
        }
        resolve();
      })
    );
  },
}
;
