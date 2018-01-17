import React from 'react';
import PrivateRoute from '../router/privateRoute.jsx';
import Forms from './forms/forms.jsx';
import HomeTiles from './hometiles/homeTiles.jsx';
import Orders from './orders/orders.jsx';
import Coupons from './coupons/coupons.jsx';

export default () => [
  <PrivateRoute path="/admin/orders" allowedRoles={['admin']} component={Orders} />,
  <PrivateRoute path="/admin/forms" allowedRoles={['admin']} component={Forms} />,
  <PrivateRoute path="/admin/hometiles" allowedRoles={['admin']} component={HomeTiles} />,
  <PrivateRoute path="/admin/coupons" allowedRoles={['admin']} component={Coupons} />,
];
