import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { grey50 } from 'material-ui/styles/colors';
import { backgroundColor, brandPrimary, brandSecondary } from '../theme';
import ActionTypes from '../actionTypes';
import ProductService from '../products/productService';
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
  },
};

class HomeComponent extends React.Component {

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.company}>
            <span style={styles.companyFirst}>geek</span>
            <span style={styles.companySecond}>planet</span><br />
            <small style={styles.headerSubtitle}>
              <FormattedMessage id="greeting" values={{ name: 'Patrick' }} />
            </small>
          </h1>
        </div>
        <ProductList products={this.props.products} />
      </div>
    );
  }
}

HomeComponent.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.string),
  })),
  loadProducts: PropTypes.func,
};

export default connect(
  state => state.products,
  dispatch => ({
    loadProducts() {
      ProductService.loadProducts().then(data => dispatch({
        type: ActionTypes.PRODUCTS_LOADED,
        data,
      }));
    },
  })
)(HomeComponent);
