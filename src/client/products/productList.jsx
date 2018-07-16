import Button from '@material-ui/core/Button';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, withRouter } from 'react-router-dom';
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

  render() {
    const query = queryString.parse(this.props.location.search);
    const page = Number(query.page) || 1;
    const prevLink = `/products?${queryString.stringify({ ...query, page: page - 1 })}`;
    const nextLink = `/products?${queryString.stringify({ ...query, page: page + 1 })}`;
    const maxPage = Math.ceil(this.props.products.length / PAGE_SIZE);

    return [
      <Helmet key="productListHeader">
        {page > 1 && <link rel="prev" href={prevLink} />}
        {page < maxPage && <link rel="next" href={nextLink} />}
      </Helmet>,
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
          component={Link}
          to={prevLink}
        >
          <ArrowLeft />
        </PaginationButton>
        {[...new Array(maxPage)]
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
                component={Link}
                to={`/products?${queryString.stringify({ ...query, page: pageIndex })}`}
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
          disabled={page === maxPage}
          component={Link}
          to={nextLink}
        >
          <ArrowRight />
        </PaginationButton>
      </PaginationContainer>,
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
