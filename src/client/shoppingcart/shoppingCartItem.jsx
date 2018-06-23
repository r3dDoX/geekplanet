import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import pink from '@material-ui/core/colors/pink';
import common from '@material-ui/core/colors/common';
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatPriceWithoutCurrency } from '../../common/priceFormatter';
import { ShoppingCartItemPropType } from '../propTypes';
import AmountAdjuster from './amountAdjuster.jsx';

const pinkA400 = pink.A400;
const { transparent } = common;

const styles = {
  avatar: {
    objectFit: 'cover',
  },
  productName: {
    paddingRight: '80px',
    textAlign: 'justify',
  },
  notInStockMessage: {
    lineHeight: 'initial',
  },
};

const ShoppingCartItem = ({
  shoppingCartItem,
  setAmount,
  locale,
}) => [
  <ListItem
    key={`${shoppingCartItem.product._id}_item`}
    primaryText={shoppingCartItem.product[locale].name}
    secondaryText={<AmountAdjuster shoppingCartItem={shoppingCartItem} setAmount={setAmount} />}
    leftAvatar={<Avatar
      style={styles.avatar}
      src={(shoppingCartItem.product.files.length)
        ? `/api/products/pictures/${shoppingCartItem.product.files[0]}_s`
        : '/assets/images/notFound.jpg'
      }
    />}
    rightAvatar={
      <Avatar
        color={pinkA400}
        backgroundColor={transparent}
      >
        {formatPriceWithoutCurrency(shoppingCartItem.product.price * shoppingCartItem.amount)}
      </Avatar>
    }
    innerDivStyle={styles.productName}
  />,
  shoppingCartItem.product.stock <= 0 && (
    <ListSubheader
      key={`${shoppingCartItem.product._id}_stock`}
      inset
      style={styles.notInStockMessage}
    >
      <FormattedMessage id="SHOPPING_CART.NOT_IN_STOCK" />
    </ListSubheader>
  ),
];

ShoppingCartItem.propTypes = {
  shoppingCartItem: ShoppingCartItemPropType.isRequired,
  setAmount: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default ShoppingCartItem;
