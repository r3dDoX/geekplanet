import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import { createLoadShoppingCart, createLoadTranslations, createLoggedIn } from './actions';
import Agb from './agb';
import authService from './auth/authService';
import ChangePassword from './auth/changePassword';
import Login from './auth/login';
import Home from './home/home';
import Imprint from './imprint';
import Layout from './layout/layout';
import OrderStepper from './order/orderStepper';
import ProductDetails from './products/productDetails';
import Products from './products/products';
import asyncComponent from './router/asyncComponent';
import GenericError from './router/genericError';
import PrivateRoute from './router/privateRoute';
import ScrollToTop from './router/scrollToTop';
import { ids, load } from './storage';

const LazyAdmin = asyncComponent(() => import('./admin/admin').then(module => module.default));

class App extends React.Component {
  componentWillMount() {
    this.props.loadTranslations(this.props.locale);
    this.props.loadShoppingCart();
    this.props.checkLoggedIn();
  }

  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/error" component={GenericError} />
            <Route exact path="/agb" component={Agb} />
            <Route exact path="/imprint" component={Imprint} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/login/changepassword" component={ChangePassword} />
            <Route exact path="/products/" component={Products} />
            <Route path="/products/:id" component={ProductDetails} />
            <PrivateRoute path="/order" component={OrderStepper} />

            <PrivateRoute path="/admin" allowedRoles={['admin']} component={LazyAdmin} />
          </Layout>
        </ScrollToTop>
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
