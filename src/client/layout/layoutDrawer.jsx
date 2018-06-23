import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import grey from '@material-ui/core/colors/grey';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';
import withRouter from 'react-router-dom/withRouter';
import styled from 'styled-components';
import { ProductCategoryPropType } from '../propTypes';
import { laMinSize } from '../theme';

const grey300 = grey['300'];

const StyledDrawer = styled(Drawer)`
  width: 256px;
`;

const CategoryDivider = styled(Divider)`
  margin-left: 16px !important;
`;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: '256px',
  },
  toolbar: theme.mixins.toolbar,
});

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
      classes,
    } = this.props;
    const laMinSizeNumber = Number(laMinSize.slice(0, -2));
    const toggleDrawerOnMobile = () => this.state.width < laMinSizeNumber && toggleDrawer();

    const query = queryString.parse(this.props.location.search);
    const selectedCategories = query.categories
      ? query.categories.split(',')
      : [];

    function recursivelyRenderCategoryMenus(category) {
      const categoryIds = mapSubCategoryIds(category);
      return [
        <ListItem
          key={category._id}
          role="link"
          primaryText={category.de.name}
          primaryTogglesNestedList
          initiallyOpen={selectedCategories.some(
            categoryId => categoryIds.includes(categoryId)
          )}
          nestedItems={
            category.subCategories.flatMap(
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
          hoverColor={grey300}
        />,
        !category.parentCategory
          ? <CategoryDivider key={`${category._id}Divider`} />
          : null,
      ];
    }

    return (
      <StyledDrawer
        anchor="left"
        open={this.state.width >= laMinSizeNumber || drawerOpened}
        onRequestChange={toggleDrawerOnMobile}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {roles.includes('admin') ? ([
            <ListSubheader key="admin">
              <FormattedMessage id="NAVIGATION.ADMIN" />
            </ListSubheader>,
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
          <Divider />
          <ListSubheader>
            <FormattedMessage id="NAVIGATION.PRODUCTS" />
          </ListSubheader>
          <ListItem
            primaryText={<FormattedMessage id="NAVIGATION.ALL_PRODUCTS" />}
            containerElement={
              <Link to="/products" />
            }
            style={selectedCategories.length === 0 && location.pathname.includes('products')
              ? style.selectedItem
              : null
            }
            onClick={toggleDrawerOnMobile}
          />
          <CategoryDivider />
          {productCategories
            .map(category => recursivelyRenderCategoryMenus(category))}
        </List>
      </StyledDrawer>
    );
  }
}

LayoutDrawer.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  logout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  drawerOpened: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(withRouter(LayoutDrawer));
