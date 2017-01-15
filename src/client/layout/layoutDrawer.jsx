import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Link from 'react-router/lib/Link';

const LayoutDrawer = ({ roles, logout, login, loggedIn, drawerOpened, toggleDrawer }) => (
  <Drawer
    docked={false}
    open={drawerOpened}
    onRequestChange={toggleDrawer}
  >
    <AppBar
      title="geekplanet"
      onLeftIconButtonTouchTap={toggleDrawer}
      iconElementLeft={<IconButton><NavigationClose /></IconButton>}
    />
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
          onClick={logout}
          onTouchTap={toggleDrawer}
        />
        :
        <MenuItem primaryText="Login" onClick={login} />
    }
  </Drawer>
);

LayoutDrawer.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  drawerOpened: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default LayoutDrawer;
