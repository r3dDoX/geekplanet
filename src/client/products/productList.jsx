import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { Helmet } from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const PAGE_SIZE = 40;

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    const query = queryString.parse(props.history.location.search);
    this.state = {
      currentPage: 0,
      preselectedPage: query.page && Number(query.page),
      loadedProducts: [],
    };
  }

  componentDidMount() {
    if (this.state.preselectedPage) {
      this.updateProductArrayForPage(this.state.preselectedPage, this.props.products);
    } else {
      this.updateProductArrayForPage(1, this.props.products);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.products !== nextProps.products) {
      this.props.history.push('/products');
      this.setState({
        preselectedPage: undefined,
      }, () => this.updateProductArrayForPage(1, nextProps.products));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.filterNotShownOrClosing(nextProps) && (
      this.filterClosing(nextProps)
      || nextProps.products !== this.props.products
      || nextState.currentPage !== this.state.currentPage
    );
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
    const previousLink = this.state.currentPage > 1 ? `${APP.BASE_URL}/products?page=${this.state.currentPage - 1}` : undefined;
    const nextLink = (this.state.currentPage < this.props.products.length / PAGE_SIZE) ? `${APP.BASE_URL}/products?page=${this.state.currentPage + 1}` : undefined;

    return [
      <Helmet key="productListHead">
        {previousLink &&
          <link rel="prev" href={previousLink} />
        }
        {nextLink &&
          <link rel="next" href={nextLink} />
        }
      </Helmet>,
      this.state.preselectedPage ? (
        <ProductListContainer key="productListProducts">
          {this.state.loadedProducts.map(product => (
            <ProductTile
              key={product._id}
              product={product}
            />
          ))}
        </ProductListContainer>
      ) : (
        <InfiniteScroll
          key="productListProducts"
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
      ),
      (this.state.preselectedPage) && (
        <ButtonContainer key="productListButtons">
          {previousLink &&
            <RaisedButton
              primary
              label={<FormattedMessage id="PRODUCT.PREVIOUS" />}
              containerElement={
                <a href={previousLink}>
                  <FormattedMessage id="PRODUCT.PREVIOUS" />
                </a>
              }
            />
          }
          &nbsp;
          {nextLink &&
          <RaisedButton
            primary
            label={<FormattedMessage id="PRODUCT.NEXT" />}
            containerElement={
              <a href={nextLink}>
                <FormattedMessage id="PRODUCT.NEXT" />
              </a>
            }
          />
          }
        </ButtonContainer>
      ),
    ];
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  filterShown: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default withRouter(ProductList);
