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
  },
  tableRuler: {
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
  contentPadding: {
    padding: '10px',
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
    padding: '10px 0',
  },
  productPicture: {
    maxWidth: '100px',
  },
  totals: {
    padding: '10px',
    textAlign: 'right',
  },
  tableFooter: {
    color: '#424242',
    backgroundColor: '#CFD8DC',
  },
  footerCell: {
    padding: '10px',
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
};

const colCount = 4;

module.exports = function renderTemplate(order) {
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
              <td colSpan={colCount} style={styles.contentPadding}>
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
            <tr>
              <td colSpan={colCount} style={styles.tableRuler}>
                <div style={styles.tableRulerContent} />
              </td>
            </tr>
            {order.items.map(({ amount, product }) => (
              <tr>
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
              <td colSpan={colCount} style={styles.contentPadding}>
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
                7.- CHF
              </td>
            </tr>
            <tr>
              <td colSpan={Math.floor(colCount / 2)} style={styles.contentPadding}>
                <FormattedMessage id="COMMON.SHIPPING_COSTS" />
              </td>
              <td colSpan={Math.ceil(colCount / 2)} style={styles.totals}>
                0.- CHF
              </td>
            </tr>
            <tr>
              <td colSpan={Math.floor(colCount / 2)} style={styles.contentPadding}>
                <strong><FormattedMessage id="COMMON.TOTAL" /></strong>
              </td>
              <td colSpan={Math.ceil(colCount / 2)} style={styles.totals}>
                <strong>7.- CHF</strong>
              </td>
            </tr>
            <tr>
              <td colSpan={colCount}>&nbsp;</td>
            </tr>
            <tr>
              <td colSpan={colCount} style={styles.contentPadding}>
                <div style={styles.title}>
                  <FormattedMessage id="EMAIL.SHIPPING_ADDRESS_TITLE" />
                </div>
              </td>
            </tr>
            <tr>
              <td
                colSpan={colCount}
                style={Object.assign({}, styles.contentPadding, styles.textCenter)}
              >
                <FormattedHTMLMessage
                  id="EMAIL.SHIPPING_ADDRESS"
                  values={order.address}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={colCount} style={styles.contentPadding}>
                <div style={styles.title}>
                  <FormattedMessage id="EMAIL.BANK_DETAILS_TITLE" />
                </div>
              </td>
            </tr>
            <tr>
              <td
                colSpan={colCount}
                style={Object.assign({}, styles.contentPadding, styles.textCenter)}
              >
                <FormattedHTMLMessage id="EMAIL.BANK_DETAILS" />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr style={styles.tableFooter}>
              <td colSpan={2} style={styles.footerCell}>
                geekplanet GmbH
              </td>
              <td colSpan={2} style={Object.assign({}, styles.footerCell, styles.textRight)}>
                <a href="https://youtube.com" taget="_blank" style={styles.socialLink}>
                  <img
                    alt="Youtube"
                    style={styles.socialIcon}
                    src={`${config.APP.BASE_URL}/assets/images/youtube.png`}
                  />
                </a>
                <a href="https://facebook.com" taget="_blank" style={styles.socialLink}>
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
