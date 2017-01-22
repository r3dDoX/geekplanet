import React from 'react';
import { FormattedMessage } from 'react-intl';
import { grey50 } from 'material-ui/styles/colors';
import { backgroundColor, brandPrimary, brandSecondary } from '../theme';
import ProductList from '../products/productList.jsx';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  header: {
    padding: '50px',
    textAlign: 'center',
    backgroundColor,
  },
  company: {
    fontSize: '56px',
    fontWeight: 300,
    margin: '30px auto 0',
  },
  companyFirst: {
    color: brandPrimary,
  },
  companySecond: {
    color: brandSecondary,
  },
  headerSubtitle: {
    color: grey50,
    fontSize: '18px',
    fontWeight: 300,
    margin: '20px auto 50px',
  },
};

export default () => (
  <div style={styles.container}>
    <div style={styles.header}>
      <h1 style={styles.company}>
        <span style={styles.companyFirst}>geek</span>
        <span style={styles.companySecond}>planet</span><br />
      </h1>
      <h2 style={styles.headerSubtitle}>
        <FormattedMessage id="HEADER.GREETING" values={{ name: 'Patrick' }} />
      </h2>
    </div>
    <ProductList />
  </div>
);
