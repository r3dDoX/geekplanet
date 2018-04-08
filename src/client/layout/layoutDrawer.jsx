import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import PropTypes from 'prop-types';
import queryString from 'query-string';
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

const style = {
  selectedItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
};

function mapSubCategoryIds(category) {
  return category.subCategories
    .flatMap(subCategory => [subCategory._id].concat(mapSubCategoryIds(subCategory)));
}

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

    const query = queryString.parse(this.props.location.search);
    const selectedCategories = query.categories
      ? query.categories.split(',')
      : [];

    function recursivelyRenderCategoryMenus(category) {
      const categoryIds = mapSubCategoryIds(category);
      return (
        <ListItem
          key={category._id}
          primaryText={category.de.name}
          primaryTogglesNestedList
          initiallyOpen={selectedCategories.some(
            categoryId => categoryIds.includes(categoryId)
          )}
          nestedItems={
            category.subCategories.map(
              subCategory => recursivelyRenderCategoryMenus(subCategory, toggleDrawerOnMobile)
            )
          }
          onClick={() => {
            toggleDrawerOnMobile();
            history.push(`/products?categories=${category._id}`);
          }}
          style={selectedCategories.includes(category._id)
            ? style.selectedItem
            : null
          }
        />
      );
    }

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
          iconStyleLeft={{
            display: this.state.width < laMinSizeNumber
              ? 'block'
              : 'none',
          }}
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
          <Divider key="ProductDivider" />
          <Subheader key="products">
            <FormattedMessage id="NAVIGATION.PRODUCTS" />
          </Subheader>
          {productCategories
            .map(category => recursivelyRenderCategoryMenus(category))}
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
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(LayoutDrawer);
