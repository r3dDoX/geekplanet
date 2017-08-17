import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { createHideShoppingCartNotification, createLogout, createToggleDrawer } from '../actions';
import authService from '../auth/authService';
import ShoppingCartDrawer from '../shoppingcart/shoppingCartDrawer.jsx';
import Footer from './footer.jsx';
import Header from './header.jsx';
import LayoutDrawer from './layoutDrawer.jsx';
import MainSpinner from './mainSpinner.jsx';

const Container = styled.div`
  padding-top: 64px;
`;

const Body = styled(Paper)`
  position: relative;
`;

const Layout = ({
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
  children,
}) => {
  if (translations) {
    return (
      <IntlProvider locale={language} messages={translations}>
        <Container>
          <Header toggleDrawer={toggleDrawer} />
          <LayoutDrawer
            roles={roles}
            logout={() => {
              authService.logout();
              logout();
            }}
            loggedIn={loggedIn}
            drawerOpened={drawerOpened}
            toggleDrawer={toggleDrawer}
          />
          <ShoppingCartDrawer />
          <Body>
            {children}
          </Body>
          <Footer />
          <Snackbar
            open={shoppingCartNotification}
            message={
              <FormattedMessage id="NOTIFICATION.SHOPPING_CART_ITEM_ADDED" />
            }
            autoHideDuration={4000}
            onRequestClose={hideShoppingCartNotification}
          />
        </Container>
      </IntlProvider>
    );
  }

  return <MainSpinner />;
};

Layout.defaultProps = {
  i18n: {
    translations: undefined,
  },
};

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
};

export default withRouter(connect(
  state => ({
    auth: state.auth,
    layout: state.layout,
    i18n: state.i18n,
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
  })
)(Layout));
