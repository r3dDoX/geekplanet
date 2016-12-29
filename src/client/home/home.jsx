import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ActionTypes from '../actionTypes';
import ProductService from '../products/productService';
import ProductList from '../products/productList.jsx';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '20px 10px',
  },
};

class HomeComponent extends React.Component {

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    return (
      <div style={styles.container}>
        <div>
          <h1>
            <FormattedMessage id="greeting" values={{ name: 'Patrick' }} />
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
