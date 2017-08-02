import Divider from 'material-ui/Divider';
import { green500, grey300 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createLoadProduct } from '../actions';
import MainSpinner from '../layout/mainSpinner.jsx';
import OrderButton from '../order/orderButton.jsx';
import { ProductPropType } from '../propTypes';
import { accent1Color, brandPrimary } from '../theme';
import { formatPriceWithCurrency } from './priceFormatter';
import ProductSlider from './productSlider.jsx';
import StockIcon from './stockIcon.jsx';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  productContainer: {
    padding: '10px 10px 50px',
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
  descriptionList: {
    listStyle: 'none',
    paddingLeft: '25px',
    margin: '0',
  },
  listItem: {
    padding: '10px',
    borderTop: `1px solid ${grey300}`,
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
      productLoading,
    } = this.props;
    return (
      <div style={styles.container}>
        {(product && !productLoading) ? (
          <div style={styles.productContainer}>
            <div style={styles.gridListContainer}>
              <ProductSlider product={product}/>
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
            <h3>Beschreibung</h3>
            <p
              style={styles.productDescription}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: product[locale].description }}
            />
            <Divider style={styles.divider} />
            {product[locale].specifications.length ? (
              <div>
                <h3><FormattedMessage id="PRODUCT.SPECIFICATIONS" /></h3>
                <ul style={styles.descriptionList}>
                  {product[locale].specifications.map(specification => (
                    <li key={specification} style={styles.listItem}>
                      {specification}
                    </li>
                  ))}
                </ul>
                <Divider style={styles.divider} />
              </div>
            ) : null}
            {product[locale].delivery.length ? (
              <div>
                <h3><FormattedMessage id="PRODUCT.DELIVERY" /></h3>
                <ul style={styles.descriptionList}>
                  {product[locale].delivery.map(delivery => (
                    <li key={delivery} style={styles.listItem}>
                      {delivery}
                    </li>
                  ))}
                </ul>
                <Divider style={styles.divider} />
              </div>
            ) : null}
            {product[locale].downloads.length ? (
              <div>
                <h3><FormattedMessage id="PRODUCT.DOWNLOADS" /></h3>
                <ul style={styles.descriptionList}>
                  {product[locale].downloads.map(downloadLink => (
                    <li key={downloadLink.text} style={styles.listItem}>
                      <a href={downloadLink.href} target="_blank">{downloadLink.text}</a>
                    </li>
                  ))}
                </ul>
                <Divider style={styles.divider} />
              </div>
            ) : null}
          </div>
        ) : <MainSpinner />}
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
