import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import { IntlProvider, FormattedMessage } from 'react-intl';
import ActionTypes from '../actionTypes';
import Header from './header.jsx';
import Footer from './footer.jsx';
import LayoutDrawer from './layoutDrawer.jsx';

const styles = {
  container: {
    paddingTop: '60px',
  },
  bodyContainer: {
    position: 'relative',
  },
  appBar: {
    position: 'fixed',
    top: 0,
  },
  title: {
    textDecoration: 'none',
    color: 'inherit',
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
};

const Layout = ({
  auth: {
    authService,
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
        <div style={styles.container}>
          <Header toggleDrawer={toggleDrawer} />
          <LayoutDrawer
            roles={roles}
            logout={() => {
              authService.logout();
              logout();
            }}
            login={() => authService.login()}
            loggedIn={loggedIn}
            drawerOpened={drawerOpened}
            toggleDrawer={toggleDrawer}
          />
          <Paper style={styles.bodyContainer}>
            {children}
          </Paper>
          <Footer />
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

  return <CircularProgress style={styles.spinner} size={80} thickness={5} />;
}

Layout.defaultProps = {
  i18n: {
    translations: undefined,
  },
};

Layout.propTypes = {
  auth: PropTypes.shape({
    authService: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    }).isRequired,
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
      dispatch({
        type: ActionTypes.LOGGED_OUT,
      });
    },
    toggleDrawer() {
      dispatch({
        type: ActionTypes.TOGGLE_DRAWER,
      });
    },
    hideShoppingCartNotification() {
      dispatch({
        type: ActionTypes.HIDE_SHOPPING_CART_NOTIFICATION,
      });
    },
  })
)(Layout));
