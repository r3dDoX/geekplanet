import Badge from 'material-ui/Badge';
import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderButton from '../order/orderButton.jsx';
import { ProductPropType } from '../propTypes';
import { formatPriceWithCurrency } from '../../common/priceFormatter';
import { getPictureUrl } from './productService';
import StockIcon from './stockIcon.jsx';
import Authorized from '../auth/authorized.jsx';

const styles = {
  container: {
    flex: '1 1 300px',
    maxWidth: '450px',
    margin: '0 10px 16px',
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
    flexWrap: 'wrap',
  },
  priceTag: {
    marginLeft: '8px',
  },
  pictureContainer: {
    flex: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden',
    alignItems: 'center',
    cursor: 'pointer',
  },
  editButton: {
    marginTop: '10px',
  },
};

export const ProductTileComponent = ({
  locale,
  product,
}) => (
  <Card style={styles.container} containerStyle={styles.cardContainer}>
    {(product.files.length) ? (
      <Link to={`/products/${product._id}`}>
        <CardMedia style={styles.pictureContainer}>
          <img alt="Product" src={getPictureUrl(product.files[0])} />
        </CardMedia>
      </Link>
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
      <span style={styles.priceTag}>{formatPriceWithCurrency(product.price)}</span>
      <OrderButton product={product} />
      <Authorized allowedRoles={['admin']}>
        <RaisedButton
          style={styles.editButton}
          label={<FormattedMessage id="COMMON.EDIT" />}
          fullWidth
          secondary
          containerElement={<Link to={`/forms/products/${product._id}`} />}
        />
      </Authorized>
    </CardActions>
  </Card>
);

ProductTileComponent.propTypes = {
  locale: PropTypes.string.isRequired,
  product: ProductPropType.isRequired,
};

export default connect(
  state => ({
    locale: state.i18n.locale,
  })
)(ProductTileComponent);
