import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';
import withRouter from 'react-router-dom/withRouter';
import styled from 'styled-components';
import { ProductCategoryPropType } from '../propTypes';
import { laMinSize } from '../theme';

const Title = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

class LayoutDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', () => this.updateWindowDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateWindowDimensions());
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  recursivelyRenderCategoryMenus(category, toggleDrawer) {
    return (
      <ListItem
        key={category._id}
        primaryText={category.de.name}
        nestedItems={
          category.subCategories.map(
            subCategory => this.recursivelyRenderCategoryMenus(subCategory, toggleDrawer)
          )
        }
        onClick={() => {
          toggleDrawer();
          this.props.history.push(`/products?categories=${category._id}`);
        }}
      />
    );
  }

  render() {
    const {
      roles,
      logout,
      loggedIn,
      drawerOpened,
      toggleDrawer,
      history,
      productCategories,
    } = this.props;
    const laMinSizeNumber = Number(laMinSize.slice(0, -2));
    const toggleDrawerOnMobile = () => this.state.width < laMinSizeNumber && toggleDrawer();

    return (
      <Drawer
        open={this.state.width >= laMinSizeNumber || drawerOpened}
        docked={this.state.width >= laMinSizeNumber}
        onRequestChange={toggleDrawerOnMobile}
      >
        <AppBar
          title={
            <Title to="/" onClick={toggleDrawer}>
              {APP.TITLE}
            </Title>
          }
          onLeftIconButtonClick={toggleDrawer}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        />
        <List>
          {roles.includes('admin') ? ([
            <Subheader key="admin">
              <FormattedMessage id="NAVIGATION.ADMIN" />
            </Subheader>,
            <ListItem
              key="homeTiles"
              primaryText={<FormattedMessage id="NAVIGATION.HOME_TILES" />}
              containerElement={
                <Link to="/admin/hometiles">
                  <FormattedMessage id="NAVIGATION.HOME_TILES" />
                </Link>
              }
              onClick={toggleDrawerOnMobile}
            />,
            <ListItem
              key="forms"
              primaryText={<FormattedMessage id="NAVIGATION.FORMS" />}
              containerElement={
                <Link to="/admin/forms">
                  <FormattedMessage id="NAVIGATION.FORMS" />
                </Link>
              }
              onClick={toggleDrawerOnMobile}
            />,
            <ListItem
              key="orders"
              primaryText={<FormattedMessage id="NAVIGATION.ORDERS" />}
              containerElement={
                <Link to="/admin/orders">
                  <FormattedMessage id="NAVIGATION.ORDERS" />
                </Link>
              }
              onClick={toggleDrawer}
            />,
            <ListItem
              key="coupons"
              primaryText={<FormattedMessage id="NAVIGATION.COUPONS" />}
              containerElement={
                <Link to="/admin/coupons">
                  <FormattedMessage id="NAVIGATION.COUPONS" />
                </Link>
              }
              onClick={toggleDrawerOnMobile}
            />,
            <Divider key="AdminDivider" />,
          ]) : null}
          <Subheader key="products">
            <FormattedMessage id="NAVIGATION.PRODUCTS" />
          </Subheader>
          {productCategories
            .map(category => this.recursivelyRenderCategoryMenus(category, toggleDrawerOnMobile))}
          <Divider key="ProductDivider" />
          {
            loggedIn ? (
              <ListItem
                primaryText={<FormattedMessage id="NAVIGATION.LOGOUT" />}
                onClick={() => {
                  toggleDrawerOnMobile();
                  logout();
                  history.push('/');
                }}
              />
            ) : (
              <ListItem
                primaryText={<FormattedMessage id="NAVIGATION.LOGIN" />}
                containerElement={
                  <Link to="/login">
                    <FormattedMessage id="NAVIGATION.LOGIN" />
                  </Link>
                }
                onClick={toggleDrawerOnMobile}
              />
            )
          }
        </List>
      </Drawer>
    );
  }
}

LayoutDrawer.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  logout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  drawerOpened: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
};

export default withRouter(LayoutDrawer);
