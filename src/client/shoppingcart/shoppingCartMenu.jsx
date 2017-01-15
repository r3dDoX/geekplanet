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

export default () => (
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
    <ListItem
      primaryText="Test Product 1"
      secondaryText="49.-"
      leftAvatar={<Avatar src="/assets/images/logoGoogle.png" />}
      rightAvatar={
        <Avatar
          color={pinkA400} backgroundColor={transparent}
        >
          3
        </Avatar>
      }
    />
    <ListItem
      primaryText="Test Product 2"
      secondaryText="46.-"
      leftAvatar={<Avatar src="/assets/images/logoGoogle.png" />}
      rightAvatar={
        <Avatar
          color={pinkA400} backgroundColor={transparent}
        >
          1
        </Avatar>
      }
    />
    <Divider />
    <Subheader inset>
      <FormattedMessage id="SHOPPING_CART.TOTAL" />
    </Subheader>
    <ListItem
      disabled
      insetChildren primaryText="CHF 169.-"
    />
  </IconMenu>
);
