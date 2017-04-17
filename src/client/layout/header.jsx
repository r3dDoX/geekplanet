import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import ShoppingCartMenu from '../shoppingcart/shoppingCartMenu.jsx';

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
}) => (
  <AppBar
    title={<Link to="/" style={styles.title}>{APP.TITLE}</Link>}
    onLeftIconButtonTouchTap={toggleDrawer}
    iconElementRight={
      <ShoppingCartMenu />
    }
    style={styles.appBar}
    zDepth={0}
  />
);

Header.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default Header;
