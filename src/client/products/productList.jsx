import PropTypes from 'prop-types';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import MainSpinner from '../layout/mainSpinner.jsx';
import { ProductPropType } from '../propTypes';
import { mdMinSize } from '../theme';
import ProductTile from './productTile.jsx';

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  padding: 20px 15px;
  
  @media screen and (min-width: ${mdMinSize}) {
    padding-top: 90px;
  }
`;

const PAGE_SIZE = 40;

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      loadedProducts: [],
    };
  }

  componentDidMount() {
    this.updateProductArrayForPage(1, this.props.products);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.filterNotShownOrClosing(nextProps) && (
      this.filterClosing(nextProps)
      || nextProps.products !== this.props.products
      || nextState.currentPage !== this.state.currentPage
    );
  }

  componentWillUpdate(nextProps) {
    if (this.props.products !== nextProps.products) {
      this.updateProductArrayForPage(1, nextProps.products);
    }
  }

  filterClosing(nextProps) {
    return this.props.filterShown === true && nextProps.filterShown === false;
  }

  filterNotShownOrClosing(nextProps) {
    return !this.props.filterShown || this.filterClosing(nextProps);
  }

  updateProductArrayForPage(page, products) {
    let startIndex = 0;

    if (this.state.preselectedPage) {
      startIndex = (this.state.preselectedPage - 1) * PAGE_SIZE;
    }

    this.setState({
      currentPage: page,
      loadedProducts: products.slice(startIndex, page * PAGE_SIZE),
    });
  }

  render() {
    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={newPage => this.updateProductArrayForPage(newPage, this.props.products)}
        hasMore={this.state.loadedProducts.length < this.props.products.length}
        loader={<MainSpinner />}
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
  filterShown: PropTypes.bool.isRequired,
};

export default ProductList;
