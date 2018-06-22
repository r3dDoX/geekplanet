import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import { pinkA400, transparent } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatPriceWithoutCurrency } from '../../common/priceFormatter';
import { ShoppingCartItemPropType } from '../propTypes';
import AmountAdjuster from './amountAdjuster.jsx';

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
    <Subheader
      key={`${shoppingCartItem.product._id}_stock`}
      inset
      style={styles.notInStockMessage}
    >
      <FormattedMessage id="SHOPPING_CART.NOT_IN_STOCK" />
    </Subheader>
  ),
];

ShoppingCartItem.propTypes = {
  shoppingCartItem: ShoppingCartItemPropType.isRequired,
  setAmount: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default ShoppingCartItem;
