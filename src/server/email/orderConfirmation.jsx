const React = require('react');
const ReactDOMServer = require('react-dom/server');

const config = require('../../config/local.config.json');

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
    backgroundColor: '#F5F5F5',
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
    background: '#F5F5F5',
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
    backgroundColor: '#CFD8DC',
  },
};

const colCount = 4;

module.exports = function renderTemplate() {
  return ReactDOMServer.renderToStaticMarkup(
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
              Vielen Dank für deinen Einkauf!
            </td>
          </tr>
          <tr>
            <td colSpan={colCount} style={styles.contentPadding}>
              <div style={styles.title}>
                Order Number: AAD130597D
              </div>
            </td>
          </tr>
          <tr style={styles.headings}>
            <th />
            <th style={styles.headingCell}>Produkt</th>
            <th style={styles.headingCell}>Menge</th>
            <th style={styles.headingCell}>Total</th>
          </tr>
          <td colSpan={colCount} style={styles.tableRuler}>
            <div style={styles.tableRulerContent} />
          </td>
          <tr>
            <td style={styles.productCell}>
              <img
                style={styles.productPicture}
                alt="Product"
                src={`${config.APP.BASE_URL}/api/products/pictures/BkhgE06z0LW_s`}
              />
            </td>
            <td style={styles.productCell}>
              Vallejo Game Air Barbarian Flesh<br />
              3.50 CHF
            </td>
            <td style={styles.productCell}>
              2
            </td>
            <td style={styles.productCell}>
              7.00 CHF
            </td>
          </tr>
          <tr>
            <td colSpan={colCount} style={styles.tableRuler}>
              <div style={styles.tableRulerContent} />
            </td>
          </tr>
          <tr>
            <td style={styles.productCell}>
              <img
                style={styles.productPicture}
                alt="Product"
                src={`${config.APP.BASE_URL}/api/products/pictures/BkhgE06z0LW_s`}
              />
            </td>
            <td style={styles.productCell}>
              Vallejo Game Air Barbarian Flesh<br />
              3.50 CHF
            </td>
            <td style={styles.productCell}>
              2
            </td>
            <td style={styles.productCell}>
              7.00 CHF
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={colCount} style={styles.contentPadding}>
              <div style={styles.title}>
                <strong>Total</strong>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={Math.floor(colCount / 2)} style={styles.contentPadding}>
              Zwischentotal
            </td>
            <td colSpan={Math.ceil(colCount / 2)} style={styles.totals}>
              7.- CHF
            </td>
          </tr>
          <tr>
            <td colSpan={Math.floor(colCount / 2)} style={styles.contentPadding}>
              Versandkosten
            </td>
            <td colSpan={Math.ceil(colCount / 2)} style={styles.totals}>
              0.- CHF
            </td>
          </tr>
          <tr>
            <td colSpan={Math.floor(colCount / 2)} style={styles.contentPadding}>
              <strong>Total</strong>
            </td>
            <td colSpan={Math.ceil(colCount / 2)} style={styles.totals}>
              <strong>7.- CHF</strong>
            </td>
          </tr>
          <tr>
            <td colSpan={colCount}>&nbsp;</td>
          </tr>
        </tfoot>
      </table>
    </body>
  );
};
