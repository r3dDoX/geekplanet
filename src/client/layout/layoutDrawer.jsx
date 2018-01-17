import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';
import withRouter from 'react-router-dom/withRouter';

const LayoutDrawer = ({
  roles,
  logout,
  loggedIn,
  drawerOpened,
  toggleDrawer,
  history,
}) => (
  <Drawer
    docked={false}
    open={drawerOpened}
    onRequestChange={toggleDrawer}
    disableSwipeToOpen
  >
    <AppBar
      title={APP.TITLE}
      onLeftIconButtonClick={toggleDrawer}
      iconElementLeft={<IconButton><NavigationClose /></IconButton>}
    />
    {roles.includes('admin') ? ([
      <Subheader key="admin">
        <FormattedMessage id="NAVIGATION.ADMIN" />
      </Subheader>,
      <MenuItem
        key="homeTiles"
        primaryText={<FormattedMessage id="NAVIGATION.HOME_TILES" />}
        containerElement={
          <Link to="/admin/hometiles">
            <FormattedMessage id="NAVIGATION.HOME_TILES" />
          </Link>
        }
        onClick={toggleDrawer}
      />,
      <MenuItem
        key="forms"
        primaryText={<FormattedMessage id="NAVIGATION.FORMS" />}
        containerElement={
          <Link to="/admin/forms">
            <FormattedMessage id="NAVIGATION.FORMS" />
          </Link>
        }
        onClick={toggleDrawer}
      />,
      <MenuItem
        key="orders"
        primaryText={<FormattedMessage id="NAVIGATION.ORDERS" />}
        containerElement={
          <Link to="/admin/orders">
            <FormattedMessage id="NAVIGATION.ORDERS" />
          </Link>
        }
        onClick={toggleDrawer}
      />,
      <MenuItem
        key="coupons"
        primaryText={<FormattedMessage id="NAVIGATION.COUPONS" />}
        containerElement={
          <Link to="/admin/coupons">
            <FormattedMessage id="NAVIGATION.COUPONS" />
          </Link>
        }
        onClick={toggleDrawer}
      />,
      <Divider key="divider" />,
    ]) : null}
    <MenuItem
      primaryText="Home"
      onClick={() => {
        toggleDrawer();
        history.push('/');
      }}
    />
    <MenuItem
      primaryText={<FormattedMessage id="NAVIGATION.PRODUCTS" />}
      onClick={() => {
        toggleDrawer();
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
