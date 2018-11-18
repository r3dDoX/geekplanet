import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import { formatPriceWithCurrency } from '../../common/priceFormatter';
import Authorized from '../auth/authorized';
import OrderButton from '../order/orderButton';
import { ProductPropType } from '../propTypes';
import theme from '../theme';
import { getPictureUrl } from './productService';
import StockIcon from './stockIcon';

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
  height: 0;
  padding-top: 75%;
`;

const StyledCardContent = styled.div`
  flex: 1 1 auto;
`;

const StyledCardTitle = styled.h2`
  flex: none;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
`;

const StyledCardText = styled(Typography)`
  flex: 1 1 auto;
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
  padding-left: 16px !important;
  padding-right: 16px !important;
  
  @media screen and (min-width: ${theme.breakpoints.values.sm}px) {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
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
  margin-top: 10px !important;
`;

const StyledLink = styled(Link)`
  flex: none;
`;

const styles = () => ({
  badgeRoot: {
    marginRight: '5px',
  },
  badge: {
    top: '-15px',
  },
});

export const ProductTileComponent = ({
  locale,
  product,
  classes,
}) => (
  <StyledCard>
    <StyledLink to={`/products/${product._id}`}>
      <StyledCardMedia
        title={product[locale].name}
        image={(product.files.length) ? getPictureUrl(product.files[0]) : '/assets/images/notFound.jpg'}
      />
    </StyledLink>
    <CardContent component={StyledCardContent}>
      <Typography
        component={StyledCardTitle}
        gutterBottom
        variant="h5"
      >
        <TitleLink to={`/products/${product._id}`}>
          {product[locale].name}
        </TitleLink>
        <Badge
          badgeContent={product.stock < 0 ? 0 : product.stock}
          color={product.stock > 0 ? 'primary' : 'secondary'}
          classes={{
            root: classes.badgeRoot,
            badge: classes.badge,
          }}
        >
          <StockIcon stock={product.stock} />
        </Badge>
      </Typography>
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
          fullWidth
          color="secondary"
          component={Link}
          to={`/admin/forms/products/${product._id}`}
        >
          <FormattedMessage id="COMMON.EDIT" />
        </EditButton>
      </Authorized>
    </StyledCardActions>
  </StyledCard>
);

ProductTileComponent.propTypes = {
  locale: PropTypes.string.isRequired,
  product: ProductPropType.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(
  state => ({
    locale: state.i18n.locale,
  })
)(withStyles(styles)(ProductTileComponent));
