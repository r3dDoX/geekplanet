import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import translationService from './i18n/translationService';
import ActionTypes from './actionTypes';
import AuthService from './auth/authService';
import Layout from './layout/layout.jsx';
import Home from './home/home.jsx';
import Forms from './admin/forms/forms.jsx';
import OrderStepper from './order/orderStepper.jsx';
import PrivateRoute from './router/privateRoute.jsx';
import Login from './auth/login.jsx';
import ProductDetails from './products/productDetails.jsx';

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
    return (
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/products/:id" component={ProductDetails} />
          <PrivateRoute path="/forms" component={Forms} />
          <PrivateRoute path="/order" component={OrderStepper} />
        </Layout>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  loadTranslations: PropTypes.func.isRequired,
  loadShoppingCart: PropTypes.func.isRequired,
  authServiceCreated: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    locale: state.i18n.locale,
  }),
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
      dispatch({
        type: ActionTypes.LOGGED_IN,
      });
      authService.getUserInfo().then(profile => dispatch({
        type: ActionTypes.PROFILE_LOADED,
        data: profile,
      }));
    },
  })
)(App);
