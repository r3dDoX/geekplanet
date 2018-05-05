/* eslint-disable no-eval */
const fs = require('fs');
const nodemailer = require('nodemailer');
const envConfig = require('../../config/envConfig');
const Logger = require('../logger');
const babel = require('babel-core');

let renderOrderConfirmationTemplate;
(function transformJSX() {
  const module = {};
  eval(babel.transformFileSync(
    './src/server/email/orderConfirmation.jsx',
    { presets: ['react'] }
  ).code);
  renderOrderConfirmationTemplate = module.exports;
}());

const transporter = nodemailer.createTransport({
  host: envConfig.getSecretKey('SMTP_SERVER'),
  port: 587,
  auth: {
    user: envConfig.getSecretKey('SMTP_USER'),
    pass: envConfig.getSecretKey('SMTP_PASSWORD'),
  },
});

module.exports = {
  sendESR(
    order,
    userEmail,
    pdfPath
  ) {
    return new Promise((resolve, reject) =>
      transporter.sendMail({
        bcc: envConfig.getSecretKey('ORDER_CONFIRMATION_ADDRESS'),
        from: envConfig.getSecretKey('SMTP_USER'),
        to: userEmail,
        subject: `Bestellung ${order._id}`,
        text: 'Bestellbestätigung und Rechnung...',
        html: renderOrderConfirmationTemplate(order),
        attachments: [
          {
            filename: `${order._id}.pdf`,
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
  sendConfirmation(order, userEmail) {
    return new Promise((resolve, reject) =>
      transporter.sendMail({
        bcc: envConfig.getSecretKey('ORDER_CONFIRMATION_ADDRESS'),
        from: envConfig.getSecretKey('SMTP_USER'),
        to: userEmail,
        subject: `Bestellung ${order._id}`,
        text: 'Bestellbestätigung...',
        html: renderOrderConfirmationTemplate(order),
      }, (err) => {
        if (err) {
          Logger.error(err);
          reject();
        }
        resolve();
      })
    );
  },
};
