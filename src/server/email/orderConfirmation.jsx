const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { IntlProvider, FormattedMessage, FormattedHTMLMessage } = require('react-intl');
const { formatPriceWithCurrency } = require('../../common/priceFormatter');

const config = require('../../config/local.config.json');
const TranslationService = require('../../common/translationService');
const messages = TranslationService.transformTranslations(require('../../client/assets/translations/de.json'));

const styles = {
  container: {
    padding: 0,
    margin: 0,
    backgroundColor: '#CFD8DC',
    fontFamily: 'Arial',
    fontSize: '12px',
  },
  table: {
    backgroundColor: '#FFFFFF',
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
    padding: '0 10px',
  },
  tableRulerContent: {
    backgroundColor: '#CFD8DC',
    height: '1px',
  },
  brand: {
    padding: '20px',
    borderBottom: '1px solid #CFD8DC',
  },
  brandLogo: {
    maxWidth: '200px',
  },
  title: {
    background: '#131E31',
    color: '#FFFFFF',
    padding: '10px',
    textAlign: 'center',
  },
  headings: {
    textAlign: 'left',
  },
  headingCell: {
    padding: '10px 0',
  },
  productCell: {
    borderTop: '1px solid #CFD8DC',
    padding: '10px 0',
  },
  productPicture: {
    maxWidth: '100px',
  },
  totals: {
    textAlign: 'right',
  },
  tableFooter: {
    color: '#424242',
    backgroundColor: '#CFD8DC',
  },
  textRight: {
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },
  socialLink: {
    textDecoration: 'none',
  },
  socialIcon: {
    width: '20px',
    marginLeft: '5px',
  },
  contentPadding: {
    padding: '10px 0',
  },
};

const colCount = 4;

module.exports = function renderTemplate(order) {
  const totalAmount = order.items.reduce(
    (sum, { amount, product }) => sum + (amount * product.price),
    0
  );

  return ReactDOMServer.renderToStaticMarkup(
    <IntlProvider locale="de" messages={messages}>
      <body style={styles.container}>
        <table style={styles.table} cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th colSpan={colCount} style={styles.brand}>
                <img
                  style={styles.brandLogo}
                  alt="geekplanet Logo"
                  src={`${config.APP.BASE_URL}/assets/images/emailHeader.png`}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={colCount} style={styles.contentPadding}>
                <FormattedMessage
                  id="EMAIL.ORDER_CONFIRMATION"
                  values={{ firstName: order.address.firstName }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={colCount}>
                <div style={styles.title}>
                  <FormattedMessage
                    id="EMAIL.ORDER_NUMBER"
                    values={{ id: order._id }}
                  />
                </div>
              </td>
            </tr>
            <tr style={styles.headings}>
              <th />
              <th style={styles.headingCell}>
                <FormattedMessage id="COMMON.PRODUCT" />
              </th>
              <th style={styles.headingCell}>
                <FormattedMessage id="COMMON.QUANTITY" />
              </th>
              <th style={styles.headingCell}>
                <FormattedMessage id="COMMON.AMOUNT" />
              </th>
            </tr>
            {order.items.map(({ amount, product }) => (
              <tr key={product._id}>
                <td style={styles.productCell}>
                  <img
                    style={styles.productPicture}
                    alt="Product"
                    src={`${config.APP.BASE_URL}/api/products/pictures/${product.files[0]}_s`}
                  />
                </td>
                <td style={styles.productCell}>
                  {product.de.name}<br />
                  {formatPriceWithCurrency(product.price)}
                </td>
                <td style={styles.productCell}>
                  {amount}
                </td>
                <td style={styles.productCell}>
                  {formatPriceWithCurrency(amount * product.price)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={colCount}>
                <div style={styles.title}>
                  <strong><FormattedMessage id="COMMON.TOTAL" /></strong>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={Math.floor(colCount / 2)} style={styles.contentPadding}>
                <FormattedMessage id="COMMON.SUBTOTAL" />
              </td>
              <td colSpan={Math.ceil(colCount / 2)} style={styles.totals}>
                {formatPriceWithCurrency(totalAmount)}
              </td>
            </tr>
            <tr>
              <td colSpan={Math.floor(colCount / 2)} style={styles.contentPadding}>
                <FormattedMessage id="COMMON.SHIPPING_COSTS" />
              </td>
              <td colSpan={Math.ceil(colCount / 2)} style={styles.totals}>
                CHF 0.-
              </td>
            </tr>
            <tr>
              <td colSpan={Math.floor(colCount / 2)} style={styles.contentPadding}>
                <strong><FormattedMessage id="COMMON.TOTAL" /></strong>
              </td>
              <td colSpan={Math.ceil(colCount / 2)} style={styles.totals}>
                <strong>{formatPriceWithCurrency(totalAmount)}</strong>
              </td>
            </tr>
            <tr>
              <td colSpan={colCount}>&nbsp;</td>
            </tr>
            <tr>
              <td colSpan={colCount}>
                <div style={styles.title}>
                  <FormattedMessage id="EMAIL.SHIPPING_ADDRESS_TITLE" />
                </div>
              </td>
            </tr>
            <tr>
              <td
                colSpan={colCount}
                style={Object.assign({}, styles.textCenter, styles.contentPadding)}
              >
                <FormattedHTMLMessage
                  id="EMAIL.SHIPPING_ADDRESS"
                  values={{
                    firstName: order.address.firstName,
                    lastName: order.address.lastName,
                    streetAddress: order.address.streetAddress,
                    zip: order.address.zip,
                    city: order.address.city,
                    country: order.address.country,
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={colCount}>
                <div style={styles.title}>
                  <FormattedMessage id="EMAIL.BANK_DETAILS_TITLE" />
                </div>
              </td>
            </tr>
            <tr>
              <td
                colSpan={colCount}
                style={Object.assign({}, styles.textCenter, styles.contentPadding)}
              >
                <FormattedHTMLMessage id="EMAIL.BANK_DETAILS" />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr style={styles.tableFooter}>
              <td colSpan={2} style={styles.contentPadding}>
                geekplanet GmbH
              </td>
              <td colSpan={2} style={Object.assign({}, styles.textRight, styles.contentPadding)}>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                  <img
                    alt="Youtube"
                    style={styles.socialIcon}
                    src={`${config.APP.BASE_URL}/assets/images/youtube.png`}
                  />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                  <img
                    alt="Facebook"
                    style={styles.socialIcon}
                    src={`${config.APP.BASE_URL}/assets/images/facebook.png`}
                  />
                </a>
              </td>
            </tr>
          </tfoot>
        </table>

      </body>
    </IntlProvider>
  );
};
