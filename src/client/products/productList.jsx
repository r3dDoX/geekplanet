import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import ProductTile from './productTile.jsx';
import { ProductPropType } from '../propTypes';
import MainSpinner from '../layout/mainSpinner.jsx';

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  padding: 20px 10px;
`;

const PAGE_SIZE = 20;

class ProductList extends React.Component {
  constructor() {
    super();

    this.state = {
      currentPage: 0,
      loadedProducts: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.updateProductArrayForPage(0, nextProps.products);
  }

  updateProductArrayForPage(page, products) {
    this.setState({
      currentPage: page,
      loadedProducts: products.slice(0, (page + 1) * PAGE_SIZE),
    });
  }

  render() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={newPage => this.updateProductArrayForPage(newPage, this.props.products)}
        hasMore={this.state.loadedProducts.length < this.props.products.length}
        loader={<MainSpinner />}
        initialLoad={false}
      >
        <ProductListContainer>
          {this.state.loadedProducts.map(product => (
            <ProductTile
              key={product._id}
              product={product}
            />
          ))}
        </ProductListContainer>
      </InfiniteScroll>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(ProductPropType).isRequired,
};

export default ProductList;
