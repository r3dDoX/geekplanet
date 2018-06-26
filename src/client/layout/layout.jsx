import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import styled from 'styled-components';
import {
  createHideShoppingCartNotification,
  createLoadProductCategories,
  createLogout,
  createToggleDrawer,
} from '../actions';
import authService from '../auth/authService';
import { ProductCategoryPropType } from '../propTypes';
import ShoppingCartDrawer from '../shoppingcart/shoppingCartDrawer.jsx';
import Footer from './footer.jsx';
import Header from './header.jsx';
import LayoutDrawer from './layoutDrawer.jsx';
import MainSpinner from './mainSpinner.jsx';
import theme from '../theme';

const Body = styled(Paper)`
  position: relative;
  padding-top: 56px;
  display: flex;
  align-items: stretch;
  
  @media screen and (min-width: ${theme.breakpoints.values.sm}px) {
    padding-top: 64px;
  }
`;

const Content = styled.div`
  flex: 1;
`;

class Layout extends React.Component {
  componentWillMount() {
    if (!this.props.productCategories.length) {
      this.props.loadProductCategories();
    }
  }

  render() {
    const {
      auth: {
        loggedIn,
        roles,
      },
      layout: {
        drawerOpened,
        shoppingCartNotification,
      },
      i18n: {
        language,
        translations,
      },
      logout,
      toggleDrawer,
      hideShoppingCartNotification,
      productCategories,
      children,
    } = this.props;

    if (translations) {
      return (
        <IntlProvider locale={language} messages={translations}>
          <div>
            <Header toggleDrawer={toggleDrawer} />
            <Body>
              <LayoutDrawer
                roles={roles}
                logout={() => {
                  authService.logout();
                  logout();
                }}
                loggedIn={loggedIn}
                drawerOpened={drawerOpened}
                toggleDrawer={toggleDrawer}
                productCategories={productCategories}
              />
              <Content>
                {children}
              </Content>
            </Body>
            <Footer />
            <ShoppingCartDrawer />
            <Snackbar
              open={shoppingCartNotification}
              message={
                <FormattedMessage id="NOTIFICATION.SHOPPING_CART_ITEM_ADDED" />
              }
              autoHideDuration={4000}
              onRequestClose={hideShoppingCartNotification}
            />
          </div>
        </IntlProvider>
      );
    }

    return <MainSpinner />;
  }
}

Layout.propTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  layout: PropTypes.shape({
    drawerOpened: PropTypes.bool.isRequired,
    shoppingCartNotification: PropTypes.bool.isRequired,
  }).isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired,
    translations: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  logout: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  hideShoppingCartNotification: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
};

export default withRouter(connect(
  state => ({
    auth: state.auth,
    layout: state.layout,
    i18n: state.i18n,
    productCategories: state.products.groupedProductCategories,
  }),
  dispatch => ({
    logout() {
      dispatch(createLogout());
    },
    toggleDrawer() {
      dispatch(createToggleDrawer());
    },
    hideShoppingCartNotification() {
      dispatch(createHideShoppingCartNotification());
    },
    loadProductCategories() {
      dispatch(createLoadProductCategories());
    },
  })
)(Layout));
