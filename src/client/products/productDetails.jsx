import Divider from 'material-ui/Divider';
import { green500, grey300, grey500, grey800 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatPriceWithCurrency } from '../../common/priceFormatter';
import { createLoadProduct } from '../actions';
import MainSpinner from '../layout/mainSpinner.jsx';
import OrderButton from '../order/orderButton.jsx';
import { CompleteProductPropType } from '../propTypes';
import { accent1Color, brandSecondary } from '../theme';
import PriceCountUp from './priceCountUp.jsx';
import ProductSlider from './productSlider.jsx';
import StockIcon from './stockIcon.jsx';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${grey800};
  margin-bottom: 10px;
`;

const Product = styled.div`
  padding: 10px 10px 50px;
`;

const Price = styled.h2`
  position: relative;
  color: ${accent1Color};
`;

const OriginalPrice = styled.span`
  position: absolute;
  top: -50%;
  left: 0;
  text-decoration: line-through;
  color: ${grey500};
  font-weight: normal;
  font-size: 60%;
`;

const StyledDivider = styled(Divider)`
  margin-top: 10px !important;
`;

const ProductStock = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
`;

const ProductDescription = styled.p`
  text-align: justify;
  
  > p {
    padding: 0;
    margin: 0;
  }
`;

const DescriptionList = styled.ul`
  list-style: none;
  padding-left: 25px;
  margin: 0;
`;

const DescriptionListItem = styled.li`
  padding: 10px;
  border-top: 1px solid ${grey300};
`;

const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InStockMessage = styled.span`
  color: ${green500};
`;

const TitleContainer = styled.p`
  margin: 0;
  color: ${grey500};
`;

const TitleLink = styled(Link)`
  color: ${brandSecondary};
  text-decoration: none;
  
  &:hover {
    color: ${accent1Color};
  }
`;

class ProductDetails extends React.Component {
  componentWillMount() {
    if (!this.props.product || this.props.product._id !== this.props.match.params.id) {
      this.props.loadProduct(this.props.match.params.id);
    }
  }

  render() {
    const {
      locale,
      product,
      productLoading,
    } = this.props;
    return (
      <Container>
        <Helmet>
          <title>
            {(product && `${product[locale].name} | ${product.producer.name} | ${product.category.de.name}`) || 'Untitled'}
          </title>
        </Helmet>
        {(product && !productLoading) ? (
          <Product
            itemScope
            itemType="http://schema.org/Product"
          >
            {product.files.length ? (
              <ProductSlider product={product} />
            ) : null}
            <Title itemProp="name">
              {product[locale].name}
            </Title>
            <TitleContainer>
              <TitleLink to={`/products?producers=${product.producer._id}`}>
                <meta itemProp="brand" content={product.producer.name} />
                {product.producer.name}
              </TitleLink>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <TitleLink to={`/products?categories=${product.category._id}`}>
                <meta itemProp="category" content={product.category.de.name} />
                {product.category.de.name}
              </TitleLink>
            </TitleContainer>
            <StyledDivider />
            <OrderContainer itemProp="identifier" content={product._id}>
              <Price itemProp="offers" itemScope itemType="http://schema.org/Offer">
                <meta itemProp="itemCondition" content="http://schema.org/NewCondition" />
                <meta itemProp="priceCurrency" content="CHF" />
                <meta itemProp="price" content={product.price} />
                <meta
                  itemProp="availability"
                  content={
                    product.stock > 0
                      ? 'http://schema.org/InStock'
                      : 'http://schema.org/OutOfStock'
                  }
                />
                <PriceCountUp price={product.price} />
                {product.originalPrice && (
                  <OriginalPrice>
                    {formatPriceWithCurrency(product.originalPrice)}
                  </OriginalPrice>
                )}
              </Price>
              <OrderButton product={product} />
            </OrderContainer>
            <ProductStock>
              <StockIcon stock={product.stock} />
              &nbsp;&nbsp;&nbsp;
              {product.stock > 0 ? (
                <InStockMessage>
                  <FormattedMessage id="PRODUCT.IN_STOCK" values={{ stock: product.stock }} />
                </InStockMessage>
              ) : (
                <FormattedMessage id="PRODUCT.OUT_OF_STOCK" />
              )}
            </ProductStock>
            <StyledDivider />
            <h3>
              <FormattedMessage id="PRODUCT.DESCRIPTION" />
            </h3>
            <ProductDescription
              itemProp="description"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: product[locale].description }}
            />
            <StyledDivider />
            {product[locale].specifications.length ? (
              <div>
                <h3>
                  <FormattedMessage id="PRODUCT.SPECIFICATIONS" />
                </h3>
                <DescriptionList>
                  {product[locale].specifications.map(specification => (
                    <DescriptionListItem key={specification}>
                      {specification}
                    </DescriptionListItem>
                  ))}
                </DescriptionList>
                <StyledDivider />
              </div>
            ) : null}
            {product[locale].delivery.length ? (
              <div>
                <h3>
                  <FormattedMessage id="PRODUCT.DELIVERY" />
                </h3>
                <DescriptionList>
                  {product[locale].delivery.map(delivery => (
                    <DescriptionListItem key={delivery}>
                      {delivery}
                    </DescriptionListItem>
                  ))}
                </DescriptionList>
                <StyledDivider />
              </div>
            ) : null}
            {product[locale].downloads.length ? (
              <div>
                <h3>
                  <FormattedMessage id="PRODUCT.DOWNLOADS" />
                </h3>
                <DescriptionList>
                  {product[locale].downloads.map(downloadLink => (
                    <DescriptionListItem key={downloadLink.text}>
                      <a
                        href={downloadLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {downloadLink.text}
                      </a>
                    </DescriptionListItem>
                  ))}
                </DescriptionList>
                <StyledDivider />
              </div>
            ) : null}
          </Product>
        ) : <MainSpinner />}
      </Container>
    );
  }
}

ProductDetails.defaultProps = {
  product: undefined,
};

ProductDetails.propTypes = {
  locale: PropTypes.string.isRequired,
  product: CompleteProductPropType,
  productLoading: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  loadProduct: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    locale: state.i18n.locale,
    product: state.products.selectedProduct,
    productLoading: state.products.productLoading,
  }),
  dispatch => ({
    loadProduct(productId) {
      dispatch(createLoadProduct(productId));
    },
  })
)(ProductDetails);
