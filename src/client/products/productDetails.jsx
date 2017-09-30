import Divider from 'material-ui/Divider';
import { green500, grey300 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import React from 'react';
import DocumentTitle from 'react-document-title';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { formatPriceWithCurrency } from '../../common/priceFormatter';
import { createLoadProduct } from '../actions';
import MainSpinner from '../layout/mainSpinner.jsx';
import OrderButton from '../order/orderButton.jsx';
import { CompleteProductPropType } from '../propTypes';
import { accent1Color, brandPrimary } from '../theme';
import PriceCountUp from './priceCountUp.jsx';
import { getPictureUrl } from './productService';
import ProductSlider from './productSlider.jsx';
import StockIcon from './stockIcon.jsx';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${brandPrimary};
`;

const Product = styled.div`
  padding: 10px 10px 50px;
`;

const Price = styled.h2`
  color: ${accent1Color};
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
      <DocumentTitle title={(product && product[locale].name) || 'Untitled'}>
        <Container>
          {(product && !productLoading) ? (
            <Product
              itemScope
              itemType="http://schema.org/Product"
              itemProp="logo"
              content={product.files[0] ?
                getPictureUrl(product.files[0], 's') : '/assets/images/notFound.jpg'
              }
            >
              <ProductSlider
                product={product}
              />
              <Title itemProp="name">
                {product[locale].name}
              </Title>
              <StyledDivider />
              <OrderContainer>
                <Price itemProp="price" content={formatPriceWithCurrency(product.price)}>
                  <PriceCountUp price={product.price} />
                </Price>
                <OrderButton product={product} />
              </OrderContainer>
              <ProductStock>
                <StockIcon stock={product.stock} />&nbsp;&nbsp;&nbsp;
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
                  <h3><FormattedMessage id="PRODUCT.SPECIFICATIONS" /></h3>
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
                  <h3><FormattedMessage id="PRODUCT.DELIVERY" /></h3>
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
                  <h3><FormattedMessage id="PRODUCT.DOWNLOADS" /></h3>
                  <DescriptionList>
                    {product[locale].downloads.map(downloadLink => (
                      <DescriptionListItem key={downloadLink.text}>
                        <a href={downloadLink.href} target="_blank">{downloadLink.text}</a>
                      </DescriptionListItem>
                    ))}
                  </DescriptionList>
                  <StyledDivider />
                </div>
              ) : null}
            </Product>
          ) : <MainSpinner />}
        </Container>
      </DocumentTitle>
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
