import Button from '@material-ui/core/Button';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ProductPropType } from '../propTypes';
import theme, { mdMinSize } from '../theme';
import ProductTile from './productTile.jsx';

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  padding: 20px 15px;
  
  @media screen and (min-width: ${mdMinSize}) {
    padding-top: 80px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${theme.spacing.unit * 2}px;
`;

const PaginationButton = styled(Button)`
  margin: 0 ${theme.spacing.unit / 2}px !important;
  min-width: 48px !important;
`;

const PAGE_SIZE = 40;

class ProductList extends React.Component {
  shouldComponentUpdate(nextProps) {
    const currentPage = Number(queryString.parse(this.props.location.search).page) || 1;
    const nextPage = Number(queryString.parse(nextProps.location.search).page) || 1;

    return nextPage !== currentPage || nextProps.products !== this.props.products;
  }

  switchToPage(page) {
    const query = queryString.parse(this.props.location.search);
    query.page = page;
    this.props.history.push(`/products?${queryString.stringify(query)}`);
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
      <PaginationContainer key="paginationContainer">
        <PaginationButton
          variant="outlined"
          color="primary"
          size="small"
          disabled={page === 1}
          onClick={() => this.switchToPage(page - 1)}
        >
          <ArrowLeft />
        </PaginationButton>
        {[...new Array(Math.floor(this.props.products.length / PAGE_SIZE))]
          .map((value, index) => {
            const pageIndex = index + 1;
            const isSelected = pageIndex === page;
            return (
              <PaginationButton
                key={pageIndex}
                variant={isSelected
                  ? 'contained'
                  : 'outlined'
                }
                color="primary"
                size="small"
                disabled={isSelected}
                onClick={() => this.switchToPage(pageIndex)}
              >
                {pageIndex}
              </PaginationButton>
            );
          })
        }
        <PaginationButton
          variant="outlined"
          color="primary"
          size="small"
          disabled={page === Math.floor(this.props.products.length / PAGE_SIZE)}
          onClick={() => this.switchToPage(page + 1)}
        >
          <ArrowRight />
        </PaginationButton>
      </PaginationContainer>,
    ];
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(ProductList);
