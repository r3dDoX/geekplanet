import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import FlatButton from 'material-ui/FlatButton';
import Link from 'react-router/lib/Link';
import ActionTypes from './actionTypes';

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

const Layout = ({ authService, loggedIn, drawerOpened, roles, logout, toggleDrawer, children }) => {
  const executeLogout = () => {
    authService.logout();
    logout();
  };

  return (
    <div style={styles.container}>
      <AppBar
        title={<Link to="/" style={styles.title}>geekplanet</Link>}
        onLeftIconButtonTouchTap={toggleDrawer}
        iconElementRight={<FlatButton icon={<ActionShoppingCart />} />}
        style={styles.appBar}
        zDepth={0}
      />
      <Drawer
        docked={false}
        open={drawerOpened}
        onRequestChange={toggleDrawer}
      >
        <AppBar title="geekplanet" onLeftIconButtonTouchTap={toggleDrawer} />
        {
          roles.includes('admin') ?
            <MenuItem
              primaryText="Forms"
              containerElement={<Link to="/forms">Forms</Link>}
              onTouchTap={toggleDrawer}
            />
            : null
        }
        {
          loggedIn ?
            <MenuItem
              primaryText="Logout"
              onClick={executeLogout}
              onTouchTap={toggleDrawer}
            />
            :
            <MenuItem primaryText="Login" onClick={() => authService.login()} />
        }
      </Drawer>
      {children}
    </div>
  );
};

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
  children: PropTypes.element.isRequired,
};

export default connect(
  state => Object.assign({}, state.auth, state.layout),
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

