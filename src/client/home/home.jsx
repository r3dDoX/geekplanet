import React from 'react';
import { grey50 } from 'material-ui/styles/colors';
import { backgroundColor } from '../theme';
import ProductList from '../products/productList.jsx';
import Slogan from '../assets/images/gpslogan.svg';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  header: {
    padding: '80px 30px',
    backgroundColor,
  },
  sloganContainer: {
    maxWidth: '350px',
    margin: '0 auto',
  },
  headerSubtitle: {
    color: grey50,
    fontSize: '18px',
    fontWeight: 300,
    margin: '20px auto 50px',
  },
};

export default () => (
  <div>
    <div style={styles.header}>
      <div style={styles.sloganContainer}>
        <Slogan />
        <h1>testing</h1>
      </div>
    </div>
    <ProductList />
  </div>
);
