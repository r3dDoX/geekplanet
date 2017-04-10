import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import browserHistory from 'react-router/lib/browserHistory';
import { IntlProvider, addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import Home from './home/home.jsx';
import Layout from './layout/layout.jsx';
import Forms from './admin/forms/forms.jsx';
import translationService from './i18n/translationService';
import ActionTypes from './actionTypes';
import AuthService from './auth/authService';
import OrderStepper from './order/orderStepper.jsx';

addLocaleData([...de]);
const language = 'de-CH';
const locale = 'de';

class App extends React.Component {

  componentWillMount() {
    this.props.loadTranslations(locale);
    this.props.loadShoppingCart();

    const authService = AuthService.create(locale, this.props.loggedIn);
    this.requireAuth = (nextState, replace) => {
      if (!authService.loggedIn()) {
        replace({ pathname: '/' });
        authService.login();
      }
    };

    this.props.authServiceCreated(authService);
    if (authService.loggedIn()) {
      this.props.loggedIn(authService);
    }
  }

  render() {
    const { translations } = this.props;

    if (translations) {
      return (
        <IntlProvider locale={language} messages={translations}>
          <Router history={browserHistory}>
            <Route path="/" component={Layout}>
              <IndexRoute component={Home} />
              <Route path="forms" component={Forms} onEnter={this.requireAuth} />
              <Route path="order" component={OrderStepper} onEnter={this.requireAuth} />
            </Route>
          </Router>
        </IntlProvider>
      );
    }

    // TODO show something until translations are ready
    return <div />;
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
