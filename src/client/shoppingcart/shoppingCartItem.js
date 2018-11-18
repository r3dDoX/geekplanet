import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { formatPriceWithoutCurrency } from '../../common/priceFormatter';
import { ShoppingCartItemPropType } from '../propTypes';
import AmountAdjuster from './amountAdjuster';

const Price = styled(Typography)`
  padding: 12px;
`;

const ProductImage = styled(Avatar)`
  img {
    object-fit: cover;
  }
`;

const ProductText = styled(ListItemText)`
  padding-right: 32px !important;
  span {
    text-align: justify;
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  margin-right: 0 !important;
`;

const ShoppingCartItem = ({
  shoppingCartItem,
  setAmount,
  locale,
}) => [
  <ListItem key={`${shoppingCartItem.product._id}_item`}>
    <StyledListItemIcon>
      <ProductImage
        src={(shoppingCartItem.product.files.length)
          ? `/api/products/pictures/${shoppingCartItem.product.files[0]}_s`
          : '/assets/images/notFound.jpg'
        }
      />
    </StyledListItemIcon>
    <ProductText
      primary={shoppingCartItem.product[locale].name}
      secondary={<AmountAdjuster shoppingCartItem={shoppingCartItem} setAmount={setAmount} />}
    />
    <ListItemSecondaryAction>
      <Price color="secondary" variant="subtitle1">
        {formatPriceWithoutCurrency(shoppingCartItem.product.price * shoppingCartItem.amount)}
      </Price>
    </ListItemSecondaryAction>
  </ListItem>,
  shoppingCartItem.product.stock <= 0 && (
    <ListItem key={`${shoppingCartItem.product._id}_stock`}>
      <ListItemText inset secondary={<FormattedMessage id="SHOPPING_CART.NOT_IN_STOCK" />} />
    </ListItem>
  ),
];

ShoppingCartItem.propTypes = {
  shoppingCartItem: ShoppingCartItemPropType.isRequired,
  setAmount: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default ShoppingCartItem;
