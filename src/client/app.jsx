import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import authService from './auth/authService';
import Layout from './layout/layout.jsx';
import Home from './home/home.jsx';
import OrderStepper from './order/orderStepper.jsx';
import PrivateRoute from './router/privateRoute.jsx';
import Login from './auth/login.jsx';
import ProductDetails from './products/productDetails.jsx';
import Products from './products/products.jsx';
import {
  createLoadShoppingCart,
  createLoadTranslations,
  createLoggedIn,
} from './actions';
import asyncComponent from './router/asyncComponent.jsx';
import { load, ids } from './storage';

const LazyForms = asyncComponent(() => import('./admin/forms/forms.jsx').then(module => module.default));

class App extends React.Component {
  componentWillMount() {
    this.props.loadTranslations(this.props.locale);
    this.props.loadShoppingCart();
    this.props.checkLoggedIn();
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:id" component={ProductDetails} />
          <PrivateRoute path="/order" component={OrderStepper} />
          <PrivateRoute path="/forms" allowedRoles={['admin']} component={LazyForms} />
        </Layout>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  loadTranslations: PropTypes.func.isRequired,
  loadShoppingCart: PropTypes.func.isRequired,
  checkLoggedIn: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    locale: state.i18n.locale,
  }),
  dispatch => ({
    loadTranslations(localeWithFallback) {
      dispatch(createLoadTranslations(localeWithFallback));
    },
    loadShoppingCart() {
      dispatch(createLoadShoppingCart());
    },
    checkLoggedIn() {
      if (authService.loggedIn()) {
        dispatch(createLoggedIn(load(ids.TOKEN_PAYLOAD)));
      }
    },
  }),
)(App);
