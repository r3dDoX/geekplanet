import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';
import { ProductPropType } from '../propTypes';
import StockIcon from './stockIcon.jsx';
import { formatPriceWithCurrency } from './priceFormatter';
import { brandPrimary } from '../theme';
import { createAddItemToShoppingCart, createLoadProduct } from '../actions';

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
    color: brandPrimary,
  },
  productStock: {
    display: 'flex',
    alignItems: 'center',
  },
  productDescription: {
    textAlign: 'justify',
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
      addItemToShoppingCart,
    } = this.props;
    return (
      <div style={styles.container}>
        {product &&
        <div style={styles.productContainer}>
          <div style={styles.gridListContainer}>
            <GridList style={styles.gridList} cols={2.2}>
              {product.files.map(image => (
                <GridTile key={image}>
                  <picture>
                    <source media="(min-width: 1920px)" srcSet={`/api/products/pictures/${image}_l`} />
                    <source media="(min-width: 800px)" srcSet={`/api/products/pictures/${image}_m`} />
                    <source srcSet={`/api/products/pictures/${image}_s`} />
                    <img style={styles.picture} src={`/api/products/pictures/${image}_m`} alt="Product" />
                  </picture>
                </GridTile>
              ))}
            </GridList>
          </div>
          <h2 style={styles.price}>
            {formatPriceWithCurrency(product.price)}
          </h2>
          <h1>
            {product[locale].name}
          </h1>
          <h4 style={styles.productStock}>
            <StockIcon stock={product.stock} />&nbsp;
            {product.stock > 0 ? (
              <FormattedMessage id="PRODUCT.IN_STOCK" values={{ stock: product.stock }} />
            ) : (
              <FormattedMessage id="PRODUCT.OUT_OF_STOCK" />
            )}
          </h4>
          <p
            className="product-description"
            style={styles.productDescription}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: product[locale].description }}
          />
          <RaisedButton
            onClick={() => addItemToShoppingCart(product)}
            label={<FormattedMessage id="COMMON.ORDER" />}
            primary
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
  addItemToShoppingCart: PropTypes.func.isRequired,
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
    addItemToShoppingCart(product) {
      dispatch(createAddItemToShoppingCart(product));
    },
  })
)(ProductDetails);
