import React from 'react';
import PrivateRoute from '../router/privateRoute.jsx';
import Forms from './forms/forms.jsx';
import HomeTiles from './hometiles/homeTiles.jsx';
import Orders from './orders/orders.jsx';

export default () => (
  <div>
    <PrivateRoute path="/admin/orders" allowedRoles={['admin']} component={Orders} />
    <PrivateRoute path="/admin/forms" allowedRoles={['admin']} component={Forms} />
    <PrivateRoute path="/admin/hometiles" allowedRoles={['admin']} component={HomeTiles} />
  </div>
);
