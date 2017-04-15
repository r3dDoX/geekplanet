import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Layout from '../layout/layout.jsx';
import Home from '../home/home.jsx';
import Forms from '../admin/forms/forms.jsx';
import OrderStepper from '../order/orderStepper.jsx';
import PrivateRoute from './privateRoute.jsx';

export default () => (
  <BrowserRouter>
    <Layout>
      <Route exact path="/" component={Home} />
      <PrivateRoute path="/forms" component={Forms} />
      <PrivateRoute path="/order" component={OrderStepper} />
    </Layout>
  </BrowserRouter>
);
