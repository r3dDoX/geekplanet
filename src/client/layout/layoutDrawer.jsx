import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';
import withRouter from 'react-router-dom/withRouter';
import { ProductCategoryPropType } from '../propTypes';
import CategoryDivider from './categoryDivider.jsx';
import CategoryListItem from './categoryListItem.jsx';
import theme from '../theme';

const drawerWidth = '256px';

const styles = stylesTheme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...stylesTheme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    height: '100%',
  },
  drawerDocked: {
    height: '100%',
  },
  drawerMobile: {
    width: drawerWidth,
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

  toggleDrawerOnMobile() {
    if (this.state.width < theme.breakpoints.values.md) {
      this.props.toggleDrawer();
    }
  }

  renderDrawerContent() {
    const {
      roles,
      logout,
      loggedIn,
      history,
      productCategories,
      location: {
        search,
      },
    } = this.props;

    const query = queryString.parse(search);
    const selectedCategories = query.categories
      ? query.categories.split(',')
      : [];

    return (
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
            onClick={() => this.toggleDrawerOnMobile()}
          >
            <ListItemText primary={<FormattedMessage id="NAVIGATION.HOME_TILES" />} />
          </ListItem>,
          <ListItem
            button
            key="forms"
            component={Link}
            to="/admin/forms"
            onClick={() => this.toggleDrawerOnMobile()}
          >
            <ListItemText primary={<FormattedMessage id="NAVIGATION.FORMS" />} />
          </ListItem>,
          <ListItem
            button
            key="orders"
            component={Link}
            to="/admin/orders"
            onClick={this.toggleDrawerOnMobile()}
          >
            <ListItemText primary={<FormattedMessage id="NAVIGATION.ORDERS" />} />
          </ListItem>,
          <ListItem
            button
            key="coupons"
            component={Link}
            to="/admin/coupons"
            onClick={() => this.toggleDrawerOnMobile()}
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
                this.toggleDrawerOnMobile();
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
              onClick={() => this.toggleDrawerOnMobile()}
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
          onClick={() => this.toggleDrawerOnMobile()}
        >
          <ListItemText primary={<FormattedMessage id="NAVIGATION.ALL_PRODUCTS" />} />
        </ListItem>
        <CategoryDivider />
        {productCategories
          .map((category, index) => (
            <CategoryListItem
              key={category._id}
              category={category}
              selectedCategories={selectedCategories}
              onSelect={(categoryId) => {
                this.toggleDrawerOnMobile();
                history.push(`/products?categories=${categoryId}`);
              }}
              isLast={index === productCategories.length - 1}
            />
          ))}
      </List>
    );
  }

  render() {
    const {
      classes,
      drawerOpened,
      toggleDrawer,
    } = this.props;

    return [
      <Hidden smDown implementation="css" key="drawerMd">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper,
            docked: classes.drawerDocked,
          }}
        >
          {this.renderDrawerContent()}
        </Drawer>
      </Hidden>,
      <Hidden mdUp implementation="css" key="drawerSm">
        <Drawer
          variant="temporary"
          open={drawerOpened}
          onClose={toggleDrawer}
          classes={{
            paper: classes.drawerMobile,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {this.renderDrawerContent()}
        </Drawer>
      </Hidden>,
    ];
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
