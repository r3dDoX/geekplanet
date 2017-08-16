const fs = require('fs');
const nodemailer = require('nodemailer');
const secretConfig = require('../../config/secret.config.json');
const Logger = require('../logger');
const renderOrderConfirmationTemplate = require('./orderConfirmation.jsx');

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
    order,
    userEmail,
    pdfPath
  ) {
    return new Promise((resolve, reject) =>
      transporter.sendMail({
        bcc: process.env.ORDER_CONFIRMATION_ADDRESS || secretConfig.ORDER_CONFIRMATION_ADDRESS,
        from: process.env.SMTP_USER || secretConfig.SMTP_USER,
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
        bcc: process.env.ORDER_CONFIRMATION_ADDRESS || secretConfig.ORDER_CONFIRMATION_ADDRESS,
        from: process.env.SMTP_USER || secretConfig.SMTP_USER,
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
}
;
