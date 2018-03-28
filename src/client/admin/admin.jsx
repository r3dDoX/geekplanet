import React from 'react';
import PrivateRoute from '../router/privateRoute.jsx';
import Forms from './forms/forms.jsx';
import HomeTiles from './hometiles/homeTiles.jsx';
import Orders from './orders/orders.jsx';
import Coupons from './coupons/coupons.jsx';

export default () => [
  <PrivateRoute key="adminOrders" path="/admin/orders" allowedRoles={['admin']} component={Orders} />,
  <PrivateRoute key="adminForms" path="/admin/forms" allowedRoles={['admin']} component={Forms} />,
  <PrivateRoute key="adminHometiles" path="/admin/hometiles" allowedRoles={['admin']} component={HomeTiles} />,
  <PrivateRoute key="adminCoupons" path="/admin/coupons" allowedRoles={['admin']} component={Coupons} />,
];
