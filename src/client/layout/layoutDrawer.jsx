import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';
import withRouter from 'react-router-dom/withRouter';
import { ProductCategoryPropType } from '../propTypes';
import { laMinSize } from '../theme';
import CategoryDivider from './categoryDivider.jsx';
import CategoryListItem from './categoryListItem.jsx';

const styles = () => ({
  drawerPaper: {
    position: 'relative',
    width: '256px',
  },
});

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

    return (
      <Drawer
        anchor="left"
        open={this.state.width >= laMinSizeNumber || drawerOpened}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          {roles.includes('admin') ? ([
            <ListSubheader key="admin">
              <FormattedMessage id="NAVIGATION.ADMIN" />
            </ListSubheader>,
            <ListItem
              button
              key="homeTiles"
              component={Link}
              to="/admin/hometiles"
              onClick={toggleDrawerOnMobile}
            >
              <ListItemText primary={<FormattedMessage id="NAVIGATION.HOME_TILES" />} />
            </ListItem>,
            <ListItem
              button
              key="forms"
              component={Link}
              to="/admin/forms"
              onClick={toggleDrawerOnMobile}
            >
              <ListItemText primary={<FormattedMessage id="NAVIGATION.FORMS" />} />
            </ListItem>,
            <ListItem
              button
              key="orders"
              component={Link}
              to="/admin/orders"
              onClick={toggleDrawer}
            >
              <ListItemText primary={<FormattedMessage id="NAVIGATION.ORDERS" />} />
            </ListItem>,
            <ListItem
              button
              key="coupons"
              component={Link}
              to="/admin/coupons"
              onClick={toggleDrawerOnMobile}
            >
              <ListItemText primary={<FormattedMessage id="NAVIGATION.COUPONS" />} />
            </ListItem>,
            <Divider key="AdminDivider" />,
          ]) : null}
          {
            loggedIn ? (
              <ListItem
                button
                onClick={() => {
                  toggleDrawerOnMobile();
                  logout();
                  history.push('/');
                }}
              >
                <ListItemText primary={<FormattedMessage id="NAVIGATION.LOGOUT" />} />
              </ListItem>
            ) : (
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={toggleDrawerOnMobile}
              >
                <ListItemText primary={<FormattedMessage id="NAVIGATION.LOGIN" />} />
              </ListItem>
            )
          }
          <Divider />
          <ListSubheader>
            <FormattedMessage id="NAVIGATION.PRODUCTS" />
          </ListSubheader>
          <ListItem
            button
            role="link"
            component={Link}
            to="/products"
            onClick={() => toggleDrawerOnMobile()}
          >
            <ListItemText primary={<FormattedMessage id="NAVIGATION.ALL_PRODUCTS" />} />
          </ListItem>
          <CategoryDivider />
          {productCategories
            .map(category => (
              <CategoryListItem
                key={category._id}
                category={category}
                selectedCategories={selectedCategories}
                onSelect={(categoryId) => {
                  toggleDrawerOnMobile();
                  history.push(`/products?categories=${categoryId}`);
                }}
              />
            ))}
        </List>
      </Drawer>
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
