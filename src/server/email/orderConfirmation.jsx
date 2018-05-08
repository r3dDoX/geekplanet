const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { IntlProvider, FormattedMessage, FormattedHTMLMessage } = require('react-intl');
const { formatPriceWithCurrency } = require('../../common/priceFormatter');
const OrderState = require('../../common/orderState');

const config = require('../../config/envConfig').getEnvironmentSpecificConfig();
const TranslationService = require('../../common/translationService');
const messages = TranslationService.transformTranslations(require('../../client/assets/translations/de.json'));

const priceCalculation = require('../../common/priceCalculation')
  .create(config.ORDER.MIN_PRICE_SHIPPING, config.ORDER.SHIPPING_COST);

const styles = {
  container: {
    padding: 0,
    margin: 0,
    backgroundColor: '#CFD8DC',
    fontFamily: 'Arial',
    fontSize: '12px',
  },
  headerTable: {
    backgroundColor: '#FFFFFF',
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
    padding: '0 10px',
    borderBottom: '1px solid #CFD8DC',
  },
  table: {
    backgroundColor: '#FFFFFF',
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
    padding: '0 10px',
  },
  footerTable: {
    color: '#424242',
    backgroundColor: '#CFD8DC',
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
    padding: '0 10px',
    boxShadow: 'inset 0px 6px 3px -3px rgba(0, 0, 0, 0.12)',
  },
  tableRulerContent: {
    backgroundColor: '#CFD8DC',
    height: '1px',
  },
  brand: {
    padding: '20px',
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
  headingQuantityCell: {
    padding: '10px 0',
    textAlign: 'center',
  },
  productCell: {
    borderTop: '1px solid #CFD8DC',
    padding: '10px 0',
  },
  quantityCell: {
    borderTop: '1px solid #CFD8DC',
    textAlign: 'center',
  },
  productPicture: {
    maxWidth: '100px',
  },
  totals: {
    textAlign: 'right',
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
  textPadding: {
    padding: '20px 0',
  },
};

const colCount = 4;

module.exports = function renderTemplate(order) {
  return ReactDOMServer.renderToStaticMarkup(
    <IntlProvider locale="de" messages={messages}>
      <div style={styles.container}>
        <table style={styles.headerTable} cellPadding={0} cellSpacing={0}>
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
        </table>
        <table style={styles.table} cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr>
              <td colSpan={colCount} style={styles.textPadding}>
                <FormattedMessage
                  id="EMAIL.ORDER_CONFIRMATION"
                  values={{ firstName: order.address.firstName }}
                />
                <br /><br />
                {(order.state === OrderState.WAITING)
                  ? <FormattedMessage id="EMAIL.ORDER_PREPAYMENT" />
                  : <FormattedMessage id="EMAIL.ORDER_PAYED" />
                }
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
              <th style={styles.headingQuantityCell}>
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
                    src={product.files.length
                      ? `${config.APP.BASE_URL}/api/products/pictures/${product.files[0]}_s`
                      : `${config.APP.BASE_URL}/assets/images/notFound.jpg`
                    }
                  />
                </td>
                <td style={styles.productCell}>
                  {product.de.name}<br />
                  {formatPriceWithCurrency(product.price)}
                </td>
                <td style={styles.quantityCell}>
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
              <td colSpan={2} style={styles.contentPadding}>
                <FormattedMessage id="COMMON.SUBTOTAL" />
              </td>
              <td />
              <td style={styles.totals}>
                {formatPriceWithCurrency(order.itemTotal)}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={styles.contentPadding}>
                <FormattedMessage id="COMMON.SHIPPING_COSTS" />
              </td>
              <td>+</td>
              <td style={styles.totals}>
                {formatPriceWithCurrency(
                  priceCalculation.isInShippingCostRange(order.itemTotal)
                    ? config.ORDER.SHIPPING_COST
                    : 0
                )}
              </td>
            </tr>
            {order.coupons.length ? (
              <tr>
                <td colSpan={2} style={styles.contentPadding}>
                  <FormattedMessage id="COMMON.COUPONS" />
                </td>
                <td>-</td>
                <td style={styles.totals}>
                  {formatPriceWithCurrency(priceCalculation.calculateCouponsTotal(order.coupons))}
                </td>
              </tr>
            ) : null}
            <tr>
              <td colSpan={2} style={styles.contentPadding}>
                <strong><FormattedMessage id="COMMON.TOTAL" /></strong>
              </td>
              <td colSpan={2} style={styles.totals}>
                <strong>
                  {formatPriceWithCurrency(
                    priceCalculation.calculateGrandTotal(order.itemTotal, order.coupons)
                      ? order.total
                      : order.itemTotal
                  )}
                </strong>
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
            {order.state === OrderState.WAITING ? [
              <tr key="bankDetailsTitle">
                <td colSpan={colCount}>
                  <div style={styles.title}>
                    <FormattedMessage id="EMAIL.BANK_DETAILS_TITLE" />
                  </div>
                </td>
              </tr>,
              <tr key="bankDetailsText">
                <td
                  colSpan={colCount}
                  style={Object.assign({}, styles.textCenter, styles.contentPadding)}
                >
                  <FormattedHTMLMessage id="EMAIL.BANK_DETAILS_HINT" values={{ id: order._id }} />
                  <br /><br />
                  <FormattedHTMLMessage id="EMAIL.BANK_DETAILS" />
                </td>
              </tr>,
            ] : null}
          </tbody>
        </table>
        <table style={styles.footerTable} cellPadding={0} cellSpacing={0}>
          <tfoot>
            <tr>
              <td colSpan={2} style={styles.contentPadding}>
                geekplanet GmbH
              </td>
              <td colSpan={2} style={Object.assign({}, styles.textRight, styles.contentPadding)}>
                <a
                  href="https://www.youtube.com/channel/UCi7zjH3DyAvJoIlG8llygyQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                >
                  <img
                    alt="Youtube"
                    style={styles.socialIcon}
                    src={`${config.APP.BASE_URL}/assets/images/youtube.png`}
                  />
                </a>
                <a
                  href="https://www.facebook.com/geekplanet.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                >
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
      </div>
    </IntlProvider>
  );
};
