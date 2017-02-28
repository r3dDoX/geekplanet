import React, { PropTypes } from 'react';
import { Card, CardTitle, CardMedia, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';
import Badge from 'material-ui/Badge';
import { green500, grey700 } from 'material-ui/styles/colors';
import { FormattedMessage } from 'react-intl';
import formatPrice from '../products/priceFormatter';

const styles = {
  container: {
    flex: '1 1 300px',
    maxWidth: '450px',
    margin: '0 10px 10px',
  },
  productTileBody: {
    textAlign: 'justify',
  },
  productTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stockIcon: {
    flex: 'none',
  },
  stockBadge: {
    paddingBottom: 0,
  },
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceTag: {
    marginLeft: '8px',
  },
};

/* eslint-disable max-len */
const inStockIcon = (
  <SvgIcon style={Object.assign({ fill: green500 }, styles.stockIcon)} width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    />
  </SvgIcon>
);

const outOfStockIcon = (
  <SvgIcon style={Object.assign({ fill: grey700 }, styles.stockIcon)} width="24" height="24" viewBox="0 0 24 24">
    <defs>
      <path id="a" d="M0 0h24v24H0z" />
    </defs>
    <clipPath id="b">
      <use xlinkHref="#a" overflow="visible" />
    </clipPath>
    <path
      clipPath="url(#b)"
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
    />
  </SvgIcon>
);
/* eslint-enable max-len */

const getStockIcon = stockCount => (
  <Badge
    badgeContent={stockCount}
    primary={stockCount > 0}
    secondary={stockCount <= 0}
    style={styles.stockBadge}
  >
    {stockCount ? inStockIcon : outOfStockIcon}
  </Badge>
);

const ProductTile = ({ product, addItemToShoppingCart }) => (
  <Card style={styles.container}>
    {(product.files.length) ? (
      <CardMedia>
        <img alt="Product" src={`/api/products/pictures/${product.files[0]}`} />
      </CardMedia>
    ) : null}
    <CardTitle
      title={product.name}
      style={styles.productTitle}
    >
      {getStockIcon(product.stock)}
    </CardTitle>
    <CardText style={styles.productTileBody}>
      {product.shortDescription}
    </CardText>
    <CardActions style={styles.actionContainer}>
      <span style={styles.priceTag}>{formatPrice(product.price)}</span>
      <RaisedButton
        onClick={() => addItemToShoppingCart(product)}
        label={<FormattedMessage id="COMMON.ORDER" />}
        primary
      />
    </CardActions>
  </Card>
);

ProductTile.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    stock: PropTypes.number,
    description: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  addItemToShoppingCart: PropTypes.func.isRequired,
};

export default ProductTile;
