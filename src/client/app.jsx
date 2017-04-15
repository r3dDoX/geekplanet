import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import CircularProgress from 'material-ui/CircularProgress';
import translationService from './i18n/translationService';
import ActionTypes from './actionTypes';
import AuthService from './auth/authService';
import Router from './router/router.jsx';

addLocaleData([...de]);

const styles = {
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
};

class App extends React.Component {

  componentWillMount() {
    this.props.loadTranslations(this.props.locale);
    this.props.loadShoppingCart();

    const authService = AuthService.create(this.props.locale, this.props.loggedIn);
    this.props.authServiceCreated(authService);
    if (authService.loggedIn()) {
      this.props.loggedIn(authService);
    }
  }

  render() {
    const { translations, language } = this.props;

    if (translations) {
      return (
        <IntlProvider locale={language} messages={translations}>
          <Router />
        </IntlProvider>
      );
    }

    return <CircularProgress style={styles.spinner} size={80} thickness={5} />;
  }
}

App.defaultProps = {
  translations: undefined,
};

App.propTypes = {
  translations: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  loadTranslations: PropTypes.func.isRequired,
  loadShoppingCart: PropTypes.func.isRequired,
  authServiceCreated: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

export default connect(
  state => state.i18n,
  dispatch => ({
    loadTranslations(localeWithFallback) {
      translationService.loadTranslations(localeWithFallback).then(translations => dispatch({
        type: ActionTypes.TRANSLATIONS_LOADED,
        data: translations,
      }));
    },
    loadShoppingCart() {
      dispatch({
        type: ActionTypes.LOAD_SHOPPING_CART,
      });
    },
    authServiceCreated(auth) {
      dispatch({
        type: ActionTypes.AUTH_SERVICE_CREATED,
        data: auth,
      });
    },
    loggedIn(authService) {
      authService.getUserInfo().then(profile => dispatch({
        type: ActionTypes.LOGGED_IN,
        data: profile,
      }));
    },
  })
)(App);
