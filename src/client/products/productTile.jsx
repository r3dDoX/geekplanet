import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardMedia, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import { green500, grey700 } from 'material-ui/styles/colors';
import { FormattedMessage } from 'react-intl';
import InStockIcon from 'material-ui/svg-icons/toggle/check-box';
import OutOfStockIcon from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import formatPrice from './priceFormatter';
import productPropType from './product.proptypes';

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
    alignItems: 'flex-end',
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
  pictureContainer: {
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
  <Card style={styles.container}>
    {(product.files.length) ? (
      <CardMedia style={styles.pictureContainer}>
        <img
          alt="Product"
          src={`/api/products/pictures/${product.files[0]}`}
        />
      </CardMedia>
    ) : null}
    <CardTitle
      title={product[locale].name}
      style={styles.productTitle}
    >
      <Badge
        badgeContent={product.stock}
        primary={product.stock > 0}
        secondary={product.stock <= 0}
        style={styles.stockBadge}
      >
        {product.stock > 0 ? (
          <InStockIcon style={styles.stockIcon} color={green500} />
        ) : (
          <OutOfStockIcon style={styles.stockIcon} color={grey700} />
        )}
      </Badge>
    </CardTitle>
    <CardText style={styles.productTileBody}>
      {product[locale].shortDescription}
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
  locale: PropTypes.string.isRequired,
  product: productPropType.isRequired,
  addItemToShoppingCart: PropTypes.func.isRequired,
};

export default ProductTile;
