import React from 'react';
import { grey50 } from 'material-ui/styles/colors';
import { backgroundColor } from '../theme';
import ProductList from '../products/productList.jsx';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  header: {
    padding: '80px',
    textAlign: 'center',
    backgroundColor,
  },
  headerSubtitle: {
    color: grey50,
    fontSize: '18px',
    fontWeight: 300,
    margin: '20px auto 50px',
  },
  logo: {
    width: '200px',
  },
};

export default () => (
  <div style={styles.container}>
    <div style={styles.header}>
      <img src="/assets/images/logo.svg" alt="geekplanet Logo" style={styles.logo} />
    </div>
    <ProductList />
  </div>
);
