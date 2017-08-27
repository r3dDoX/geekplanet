import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const LayoutDrawer = ({ roles, logout, loggedIn, drawerOpened, toggleDrawer, history }) => (
  <Drawer
    docked={false}
    open={drawerOpened}
    onRequestChange={toggleDrawer}
    disableSwipeToOpen
  >
    <AppBar
      title={APP.TITLE}
      onLeftIconButtonTouchTap={toggleDrawer}
      iconElementLeft={<IconButton><NavigationClose /></IconButton>}
    />
    {
      roles.includes('admin') ?
        <MenuItem
          primaryText={<FormattedMessage id="NAVIGATION.FORMS" />}
          containerElement={
            <Link to="/admin/forms">
              <FormattedMessage id="NAVIGATION.FORMS" />
            </Link>
          }
          onClick={toggleDrawer}
        />
        : null
    }
    {
      roles.includes('admin') ?
        <MenuItem
          primaryText={<FormattedMessage id="NAVIGATION.ORDERS" />}
          containerElement={
            <Link to="/admin/orders">
              <FormattedMessage id="NAVIGATION.ORDERS" />
            </Link>
          }
          onClick={toggleDrawer}
        />
        : null
    }
    <MenuItem
      primaryText={<FormattedMessage id="NAVIGATION.PRODUCTS" />}
      onClick={() => {
        toggleDrawer();
        logout();
        history.push('/products');
      }}
    />
    {
      loggedIn ? (
        <MenuItem
          primaryText={<FormattedMessage id="NAVIGATION.LOGOUT" />}
          onClick={() => {
            toggleDrawer();
            logout();
            history.push('/');
          }}
        />
      ) : (
        <MenuItem
          primaryText={<FormattedMessage id="NAVIGATION.LOGIN" />}
          containerElement={
            <Link to="/login">
              <FormattedMessage id="NAVIGATION.LOGIN" />
            </Link>
          }
          onClick={toggleDrawer}
        />
      )
    }
  </Drawer>
);

LayoutDrawer.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  logout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  drawerOpened: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(LayoutDrawer);
