import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import hashHistory from 'react-router/lib/hashHistory';
import Home from './home/home.jsx';
import Products from './products/products.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './app.less';

ReactDOM.render((
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
    </Router>
  </MuiThemeProvider>
), document.getElementsByTagName('main')[0]);
