import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ImageGallery from 'react-image-gallery';
import Divider from 'material-ui/Divider';
import { green500 } from 'material-ui/styles/colors';
import { ProductPropType } from '../propTypes';
import StockIcon from './stockIcon.jsx';
import { formatPriceWithCurrency } from './priceFormatter';
import { accent1Color, brandPrimary } from '../theme';
import { createLoadProduct } from '../actions';
import { getPictureUrl } from './productService';
import OrderButton from '../order/orderButton.jsx';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  productContainer: {
    padding: '10px',
  },
  gridListContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  picture: {
    width: '100%',
  },
  price: {
    color: accent1Color,
  },
  title: {
    color: brandPrimary,
  },
  productStock: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
  },
  productDescription: {
    textAlign: 'justify',
  },
  orderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: '10px',
  },
  inStockMessage: {
    color: green500,
  },
};

class ProductDetails extends React.Component {

  componentWillMount() {
    this.props.loadProduct(this.props.match.params.id);
  }

  render() {
    const {
      locale,
      product,
    } = this.props;
    return (
      <div style={styles.container}>
        {product &&
        <div style={styles.productContainer}>
          <div style={styles.gridListContainer}>
            <ImageGallery
              items={product.files.map(image => ({
                original: getPictureUrl(image, 'l'),
                thumbnail: getPictureUrl(image, 's'),
              }))}
              lazyLoad
              showPlayButton={false}
              thumbnailPosition="left"
            />
          </div>
          <h1 style={styles.title}>
            {product[locale].name}
          </h1>
          <Divider style={styles.divider} />
          <div style={styles.orderContainer}>
            <h2 style={styles.price}>
              {formatPriceWithCurrency(product.price)}
            </h2>
            <OrderButton product={product} />
          </div>
          <p style={styles.productStock}>
            <StockIcon stock={product.stock} />&nbsp;&nbsp;&nbsp;
            {product.stock > 0 ? (
              <span style={styles.inStockMessage}>
                <FormattedMessage id="PRODUCT.IN_STOCK" values={{ stock: product.stock }} />
              </span>
            ) : (
              <FormattedMessage id="PRODUCT.OUT_OF_STOCK" />
            )}
          </p>
          <Divider style={styles.divider} />
          <p
            className="product-description"
            style={styles.productDescription}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: product[locale].description }}
          />
        </div>
        }
      </div>
    );
  }
}

ProductDetails.defaultProps = {
  product: undefined,
};

ProductDetails.propTypes = {
  locale: PropTypes.string.isRequired,
  product: ProductPropType,
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
  }),
  dispatch => ({
    loadProduct(productId) {
      dispatch(createLoadProduct(productId));
    },
  })
)(ProductDetails);
