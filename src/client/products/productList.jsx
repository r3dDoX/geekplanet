import React, { PropTypes } from 'react';
import { green500, grey700 } from 'material-ui/styles/colors';
import { Card, CardTitle, CardMedia, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';
import Badge from 'material-ui/Badge';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: '20px 10px',
  },
  productTile: {
    flex: '1 1 300px',
    maxWidth: '450px',
    margin: '0 10px 10px',
  },
  productTileBody: {
    textAlign: 'justify',
  },
  productTitle: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  stockIcon: {
    flex: 'none',
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
  >
    {stockCount ? inStockIcon : outOfStockIcon}
  </Badge>
);

const ProductList = ({ products }) => (
  <div style={styles.container}>
    {products.map(product => (
      <Card key={product._id} style={styles.productTile}>
        {(product.files.length) ? (
          <CardMedia>
            <img alt="Product" src={`/api/products/pictures/${product.files[0]}`} />
          </CardMedia>
          ) : null}
        <CardTitle>
          <span style={styles.productTitle}>
            {product.name}
            {getStockIcon(product.stock)}
          </span>
        </CardTitle>
        <CardText style={styles.productTileBody}>
          {product.shortDescription}
        </CardText>
        <CardActions>
          <RaisedButton label="Order" primary />
          <RaisedButton label="Save" />
        </CardActions>
      </Card>
    ))}
  </div>
);

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.string),
  })),
};

export default ProductList;
