import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ProductPropType } from '../propTypes';
import ProductTile from './productTile';
import Pagination, { PAGE_SIZE } from './pagination';


const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  padding: 20px 15px;
`;

class ProductList extends React.Component {
  shouldComponentUpdate(nextProps) {
    const currentPage = Number(queryString.parse(this.props.location.search).page) || 1;
    const nextPage = Number(queryString.parse(nextProps.location.search).page) || 1;

    return nextPage !== currentPage || nextProps.products !== this.props.products;
  }

  render() {
    const query = queryString.parse(this.props.location.search);
    const page = Number(query.page) || 1;

    return [
      <ProductListContainer key="productListContainer">
        {this.props.products
          .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
          .map(product => (
            <ProductTile
              key={product._id}
              product={product}
            />
          ))}
      </ProductListContainer>,
      this.props.products.length / PAGE_SIZE > 1 && (
        <Pagination key="paginationComponent" products={this.props.products} />
      ),
    ];
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(ProductList);
