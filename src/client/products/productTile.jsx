import Badge from 'material-ui/Badge';
import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import OrderButton from '../order/orderButton.jsx';
import { ProductPropType } from '../propTypes';
import { formatPriceWithCurrency } from '../../common/priceFormatter';
import { getPictureUrl } from './productService';
import StockIcon from './stockIcon.jsx';
import Authorized from '../auth/authorized.jsx';

const StyledCard = styled(Card)`
  flex: 1 1 300px;
  max-width: 450px;
  margin: 0 5px 10px;
  display: flex;
  flex-direction: column;
`;

const StyledCardMedia = styled(CardMedia)`
  flex: none;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  align-items: center;
  cursor: pointer;
`;

const StyledCardTitle = styled(CardTitle)`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledCardText = styled(CardText)`
  flex: 1;
  text-align: justify;
`;

const TitleLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const StyledCardActions = styled(CardActions)`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const PriceTag = styled.span`
  margin-left: 8px;
`;

const EditButton = styled(RaisedButton)`
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  flex: none;
`;

const styles = {
  cardContainer: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  stockBadge: {
    top: '5px',
    right: '5px',
  },
};

export const ProductTileComponent = ({
  locale,
  product,
}) => (
  <StyledCard containerStyle={styles.cardContainer}>
    <StyledLink to={`/products/${product._id}`}>
      <StyledCardMedia>
        <img
          alt="Product"
          src={(product.files.length) ? getPictureUrl(product.files[0]) : '/assets/images/notFound.jpg'}
        />
      </StyledCardMedia>
    </StyledLink>
    <StyledCardTitle
      title={<TitleLink to={`/products/${product._id}`}>{product[locale].name}</TitleLink>}
    >
      <Badge
        badgeContent={product.stock < 0 ? 0 : product.stock}
        primary={product.stock > 0}
        secondary={product.stock <= 0}
        badgeStyle={styles.stockBadge}
      >
        <StockIcon stock={product.stock} />
      </Badge>
    </StyledCardTitle>
    <StyledCardText>
      {product[locale].shortDescription}
    </StyledCardText>
    <StyledCardActions>
      <PriceTag>{formatPriceWithCurrency(product.price)}</PriceTag>
      <OrderButton product={product} />
      <Authorized allowedRoles={['admin']}>
        <EditButton
          label={<FormattedMessage id="COMMON.EDIT" />}
          fullWidth
          secondary
          containerElement={<Link to={`/admin/forms/products/${product._id}`} />}
        />
      </Authorized>
    </StyledCardActions>
  </StyledCard>
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
