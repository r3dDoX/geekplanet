import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import { formatPriceWithCurrency } from '../../common/priceFormatter';
import Authorized from '../auth/authorized.jsx';
import OrderButton from '../order/orderButton.jsx';
import { ProductPropType } from '../propTypes';
import { getPictureUrl } from './productService';
import StockIcon from './stockIcon.jsx';

const grey500 = grey['500'];

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

const StyledCardTitle = styled(Typography)`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledCardText = styled(Typography)`
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

const PriceTag = styled.div`
  position: relative;
  margin-left: 8px;
`;

const OriginalPriceTag = styled.span`
  position: absolute;
  top: -100%;
  left: 0;
  text-decoration: line-through;
  font-size: 80%;
  color: ${grey500};
`;

const EditButton = styled(Button)`
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  flex: none;
`;

export const ProductTileComponent = ({
  locale,
  product,
}) => (
  <StyledCard>
    <StyledLink to={`/products/${product._id}`}>
      <StyledCardMedia>
        <img
          async
          alt="Product"
          src={(product.files.length) ? getPictureUrl(product.files[0]) : '/assets/images/notFound.jpg'}
        />
      </StyledCardMedia>
    </StyledLink>
    <CardContent>
      <StyledCardTitle gutterBottom variant="headline" component="h2">
        <TitleLink to={`/products/${product._id}`}>
          {product[locale].name}
        </TitleLink>
        <Badge
          badgeContent={product.stock < 0 ? 0 : product.stock}
          primary={product.stock > 0}
          secondary={product.stock <= 0}
        >
          <StockIcon stock={product.stock} />
        </Badge>
      </StyledCardTitle>
      <StyledCardText component="p">
        {product[locale].shortDescription}
      </StyledCardText>
    </CardContent>
    <StyledCardActions>
      <PriceTag>
        {formatPriceWithCurrency(product.price)}
        {product.originalPrice && (
          <OriginalPriceTag>
            {formatPriceWithCurrency(product.originalPrice)}
          </OriginalPriceTag>
        )}
      </PriceTag>
      <OrderButton product={product} />
      <Authorized allowedRoles={['admin']}>
        <EditButton
          variant="contained"
          label={<FormattedMessage id="COMMON.EDIT" />}
          fullWidth
          color="secondary"
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
