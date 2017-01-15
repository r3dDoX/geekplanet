import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Link from 'react-router/lib/Link';
import ActionTypes from '../actionTypes';
import LayoutDrawer from './layoutDrawer.jsx';
import ShoppingCartMenu from '../shoppingcart/shoppingCartMenu.jsx';

const styles = {
  container: {
    paddingTop: '60px',
  },
  appBar: {
    position: 'fixed',
    top: 0,
  },
  title: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

const Layout = ({
  authService,
  loggedIn,
  drawerOpened,
  roles,
  logout,
  toggleDrawer,
  shoppingCart,
  children
}) => (
  <div style={styles.container}>
    <AppBar
      title={<Link to="/" style={styles.title}>geekplanet</Link>}
      onLeftIconButtonTouchTap={toggleDrawer}
      iconElementRight={
        <ShoppingCartMenu shoppingCartItems={shoppingCart} />
      }
      style={styles.appBar}
      zDepth={0}
    />
    <LayoutDrawer
      roles={roles}
      logout={() => {
        authService.logout();
        logout();
      }}
      login={() => authService.login()}
      loggedIn={loggedIn}
      drawerOpened={drawerOpened}
      toggleDrawer={toggleDrawer}
    />
    {children}
  </div>
);

Layout.propTypes = {
  logout: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  drawerOpened: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  authService: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }),
  shoppingCart: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    product: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      files: PropTypes.arrayOf(PropTypes.string),
    }),
  })),
  children: PropTypes.element.isRequired,
};

export default connect(
  state => Object.assign({
    shoppingCart: state.shoppingCart,
  }, state.auth, state.layout),
  dispatch => ({
    logout() {
      dispatch({
        type: ActionTypes.LOGGED_OUT,
      });
    },
    toggleDrawer() {
      dispatch({
        type: ActionTypes.TOGGLE_DRAWER,
      });
    },
  })
)(Layout);

