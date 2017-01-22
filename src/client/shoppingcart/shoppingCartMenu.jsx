import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router/lib/Link';
import { pinkA400, white, transparent } from 'material-ui/styles/colors';
import formatPrice from '../products/priceFormatter';
import ShoppingCartPropType from './shoppingCart.proptypes';

const ShoppingCartMenu = ({ shoppingCartItems }) => (
  <IconMenu
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    iconButtonElement={
      <IconButton>
        <ActionShoppingCart color={white} />
      </IconButton>
    }
    width={320}
  >
    <ListItem
      insetChildren
      containerElement={
        <Link to="/shoppingCart">
          <FormattedMessage id="SHOPPING_CART.TITLE" />
        </Link>
      }
      primaryText={
        <FormattedMessage id="SHOPPING_CART.SHOPPING_CART_LINK" />
      }
    />
    <Divider />
    <Subheader inset>
      <FormattedMessage id="SHOPPING_CART.PRODUCTS" />
    </Subheader>
    {shoppingCartItems.map(({ amount, product }) => (
      <ListItem
        key={product._id}
        primaryText={product.name}
        secondaryText={formatPrice(product.price)}
        leftAvatar={<Avatar src={`/api/products/pictures/${product.files[0]}`} />}
        rightAvatar={
          <Avatar
            color={pinkA400}
            backgroundColor={transparent}
          >
            {amount}
          </Avatar>
        }
      />
    ))}
    <Divider />
    <Subheader inset>
      <FormattedMessage id="SHOPPING_CART.TOTAL" />
    </Subheader>
    <ListItem
      disabled
      insetChildren
      primaryText={
        formatPrice(
          shoppingCartItems.reduce(
            (sum, { amount, product }) => sum + (product.price * amount),
            0
          )
        )
      }
    />
  </IconMenu>
);

ShoppingCartMenu.propTypes = {
  shoppingCartItems: ShoppingCartPropType.isRequired,
};

export default ShoppingCartMenu;
