import Button from '@material-ui/core/Button/index';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ProductPropType } from '../propTypes';
import theme from '../theme';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${theme.spacing.unit * 2}px;
`;

const PaginationButton = styled(Button)`
  margin: 0 ${theme.spacing.unit / 2}px !important;
  min-width: 40px !important;
`;

const PaginationIndicatorButton = styled(Button)`
  min-width: 24px !important;
`;

export const PAGE_SIZE = 40;
const MAX_PAGES_BUTTONS = 4;

function getPages(pages, index) {
  const offset = Math.floor(MAX_PAGES_BUTTONS / 2);
  let start;
  let end;

  if (index + offset >= pages.length) {
    start = Math.max(0, pages.length - MAX_PAGES_BUTTONS);
    end = pages.length;
  } else {
    start = Math.max(0, index - offset);
    end = Math.min(start + MAX_PAGES_BUTTONS, pages.length);
  }

  return pages.slice(start, end);
}

const Pagination = ({
  location: { search },
  products,
}) => {
  const query = queryString.parse(search);
  const page = Number(query.page) || 1;
  const prevLink = `/products?${queryString.stringify({ ...query, page: page - 1 })}`;
  const nextLink = `/products?${queryString.stringify({ ...query, page: page + 1 })}`;
  const maxPage = Math.ceil(products.length / PAGE_SIZE);
  const pages = [...Array(maxPage)].map((_, index) => index + 1);

  return [
    <Helmet key="productListHeader">
      {page > 1 && <link rel="prev" href={prevLink} />}
      {page < maxPage && <link rel="next" href={nextLink} />}
    </Helmet>,
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
      {pages.length > MAX_PAGES_BUTTONS && page > Math.floor(MAX_PAGES_BUTTONS / 2) && (
        <PaginationIndicatorButton
          color="primary"
          size="small"
          disabled
        >
          ...
        </PaginationIndicatorButton>
      )}
      {getPages(pages, page)
        .map((pageIndex) => {
          const isSelected = pageIndex === page;
          return (
            <PaginationButton
              key={pageIndex}
              variant={isSelected ? 'contained' : 'outlined'}
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
      {pages.length > MAX_PAGES_BUTTONS && maxPage - page > Math.floor(MAX_PAGES_BUTTONS / 2) && (
        <PaginationIndicatorButton
          color="primary"
          size="small"
          disabled
        >
          ...
        </PaginationIndicatorButton>
      )}
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
};

Pagination.propTypes = {
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Pagination);
