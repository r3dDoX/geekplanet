import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Link from 'react-router/lib/Link';
import ShoppingCartMenu from '../shoppingcart/shoppingCartMenu.jsx';
import ShoppingCartPropType from '../shoppingcart/shoppingCart.proptypes';

const styles = {
  appBar: {
    position: 'fixed',
    top: 0,
  },
  title: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

const Header = ({
  toggleDrawer,
  shoppingCart,
}) => (
  <AppBar
    title={<Link to="/" style={styles.title}>geekplanet</Link>}
    onLeftIconButtonTouchTap={toggleDrawer}
    iconElementRight={
      <ShoppingCartMenu shoppingCartItems={shoppingCart} />
    }
    style={styles.appBar}
    zDepth={0}
  />
);

Header.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  shoppingCart: ShoppingCartPropType,
};

export default Header;
