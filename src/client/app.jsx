import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import translationService from './i18n/translationService';
import AuthService from './auth/authService';
import Layout from './layout/layout.jsx';
import Home from './home/home.jsx';
import Forms from './admin/forms/forms.jsx';
import OrderStepper from './order/orderStepper.jsx';
import PrivateRoute from './router/privateRoute.jsx';
import Login from './auth/login.jsx';
import ProductDetails from './products/productDetails.jsx';
import Products from './products/products.jsx';
import {
  createAuthServiceCreated,
  createLoadShoppingCart,
  createLoadTranslations,
  createLoggedIn,
  createProfileLoaded,
} from './actions';

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
          <Route exact path="/products" component={Products} />
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
      dispatch(createLoadTranslations(translationService, localeWithFallback));
    },
    loadShoppingCart() {
      dispatch(createLoadShoppingCart());
    },
    authServiceCreated(auth) {
      dispatch(createAuthServiceCreated(auth));
    },
    loggedIn(authService) {
      dispatch(createLoggedIn());
      dispatch(createProfileLoaded(authService));
    },
  }),
)(App);
