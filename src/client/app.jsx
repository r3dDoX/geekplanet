import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import browserHistory from 'react-router/lib/browserHistory';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from './home/home.jsx';
import Layout from './layout.jsx';
import FormsContainer from './forms/formsContainer';
import reducers from './reducers';
import './app.less';

injectTapEventPlugin();

const store = createStore(reducers);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} />
          <Route path="forms" component={FormsContainer} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
), document.getElementsByTagName('main')[0]);
