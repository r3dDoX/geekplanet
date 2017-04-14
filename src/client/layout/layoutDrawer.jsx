import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Link from 'react-router/lib/Link';
import { FormattedMessage } from 'react-intl';

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
          containerElement={
            <Link to="/forms">
              <FormattedMessage id="NAVIGATION.FORMS" />
            </Link>
          }
          onClick={toggleDrawer}
        />
        : null
    }
    {
      loggedIn ?
        <MenuItem
          primaryText={<FormattedMessage id="NAVIGATION.LOGOUT" />}
          onClick={() => {
            toggleDrawer();
            logout();
          }}
        />
        :
        <MenuItem primaryText={<FormattedMessage id="NAVIGATION.LOGIN" />} onClick={login} />
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
