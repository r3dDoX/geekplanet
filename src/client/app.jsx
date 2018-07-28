import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import { createLoadShoppingCart, createLoadTranslations, createLoggedIn } from './actions';
import Agb from './agb.jsx';
import authService from './auth/authService';
import ChangePassword from './auth/changePassword.jsx';
import Login from './auth/login.jsx';
import Home from './home/home.jsx';
import Imprint from './imprint.jsx';
import Layout from './layout/layout.jsx';
import OrderStepper from './order/orderStepper.jsx';
import ProductDetails from './products/productDetails.jsx';
import Products from './products/products.jsx';
import asyncComponent from './router/asyncComponent.jsx';
import GenericError from './router/genericError.jsx';
import PrivateRoute from './router/privateRoute.jsx';
import ScrollToTop from './router/scrollToTop.jsx';
import { ids, load } from './storage';

const LazyAdmin = asyncComponent(() => import('./admin/admin.jsx').then(module => module.default));

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
