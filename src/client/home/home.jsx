import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { grey50 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';
import { backgroundColor } from '../theme';
import ProductList from '../products/productList.jsx';
import Slogan from './slogan.jsx';
import { ProductPropType } from '../propTypes';
import { createLoadSpotlightProducts } from '../actions';

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
  productLinkButton: {
    margin: '20px',
  },
};

class Home extends React.Component {
  componentWillMount() {
    if (this.props.spotlightProducts.length === 0) {
      this.props.loadSpotlightProducts();
    }
  }

  render() {
    const { spotlightProducts } = this.props;

    return (
      <div>
        <div style={styles.header}>
          <div style={styles.sloganContainer}>
            <Slogan />
          </div>
        </div>
        <ProductList items={spotlightProducts} />
        <RaisedButton
          primary
          style={styles.productLinkButton}
          label={<FormattedMessage id="PRODUCT.TO_PRODUCTS" />}
          containerElement={<Link to="/products" />}
        />
      </div>
    );
  }
}

Home.propTypes = {
  spotlightProducts: PropTypes.arrayOf(ProductPropType).isRequired,
  loadSpotlightProducts: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    spotlightProducts: state.products.spotlightProducts,
  }),
  dispatch => ({
    loadSpotlightProducts() {
      dispatch(createLoadSpotlightProducts());
    },
  })
)(Home);
