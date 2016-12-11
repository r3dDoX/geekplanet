import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import browserHistory from 'react-router/lib/browserHistory';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from './home/home.jsx';
import Layout from './layout.jsx';
import ProductContainer from './products/productContainer';
import ActionTypes from './actionTypes';
import './app.less';

injectTapEventPlugin();

const initialState = {
  selectedFiles: undefined,
};

const store = createStore(combineReducers({
  products(state = initialState, { type, data }) {
    switch (type) {
      case ActionTypes.SELECT_UPLOAD_FILES:
        return Object.assign({}, state, {
          selectedFiles: data,
        });
      default:
        return state;
    }
  },
  routing: routerReducer,
}));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} />
          <Route path="products" component={ProductContainer} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
), document.getElementsByTagName('main')[0]);
