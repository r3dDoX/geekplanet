import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Home from './home/home.jsx';

import './app.less';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
  </Router>
), document.getElementsByTagName('main')[0]);
