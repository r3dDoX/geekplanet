import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardMedia, CardText, CardActions } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import { Link } from 'react-router-dom';
import StockIcon from './stockIcon.jsx';
import formatPrice from './priceFormatter';
import { ProductPropType } from '../propTypes';
import { getPictureUrl } from './productService';
import OrderButton from '../order/orderButton.jsx';

const styles = {
  container: {
    flex: '1 1 300px',
    maxWidth: '450px',
    margin: '0 10px 10px',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  productTileBody: {
    flex: 1,
    textAlign: 'justify',
  },
  productTitle: {
    flex: 'none',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  titleLinkStyle: {
    color: 'inherit',
    textDecoration: 'none',
  },
  stockIcon: {
    flex: 'none',
  },
  stockBadge: {
    top: '5px',
    right: '5px',
  },
  actionContainer: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceTag: {
    marginLeft: '8px',
  },
  pictureContainer: {
    flex: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    maxHeight: '300px',
    overflow: 'hidden',
    alignItems: 'center',
  },
};

const ProductTile = ({
  locale,
  product,
  addItemToShoppingCart,
}) => (
  <Card style={styles.container} containerStyle={styles.cardContainer}>
    {(product.files.length) ? (
      <CardMedia style={styles.pictureContainer}>
        <img alt="Product" src={getPictureUrl(product.files[0])} />
      </CardMedia>
    ) : null}
    <CardTitle
      title={<Link style={styles.titleLinkStyle} to={`/products/${product._id}`}>{product[locale].name}</Link>}
      style={styles.productTitle}
    >
      <Badge
        badgeContent={product.stock}
        primary={product.stock > 0}
        secondary={product.stock <= 0}
        badgeStyle={styles.stockBadge}
      >
        <StockIcon stock={product.stock} />
      </Badge>
    </CardTitle>
    <CardText style={styles.productTileBody}>
      {product[locale].shortDescription}
    </CardText>
    <CardActions style={styles.actionContainer}>
      <span style={styles.priceTag}>{formatPrice(product.price)}</span>
      <OrderButton onClick={() => addItemToShoppingCart(product)} />
    </CardActions>
  </Card>
);

ProductTile.propTypes = {
  locale: PropTypes.string.isRequired,
  product: ProductPropType.isRequired,
  addItemToShoppingCart: PropTypes.func.isRequired,
};

export default ProductTile;
