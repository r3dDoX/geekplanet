import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import ProductTile from './productTile.jsx';
import { ProductPropType } from '../propTypes';
import MainSpinner from '../layout/mainSpinner.jsx';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    padding: '20px 10px',
  },
};

const pageSize = 30;

class ProductList extends React.Component {

  constructor() {
    super();

    this.state = {
      currentPage: 0,
      loadedProducts: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.updateProductArrayForPage(this.state.currentPage, nextProps.products);
  }

  updateProductArrayForPage(page, products) {
    this.setState({
      currentPage: page,
      loadedProducts: products.slice(0, (page + 1) * pageSize),
    });
  }

  render() {
    return (
      <InfiniteScroll
        pageStart={this.state.currentPage}
        loadMore={newPage => this.updateProductArrayForPage(newPage, this.props.products)}
        hasMore={this.state.loadedProducts.length < this.props.products.length}
        loader={<MainSpinner />}
      >
        <div style={styles.container}>
          {this.state.loadedProducts.map(product => (
            <ProductTile
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </InfiniteScroll>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(ProductPropType).isRequired,
};

export default ProductList;
