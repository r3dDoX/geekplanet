import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './app.jsx';
import geekplanetTheme from './theme';
import reducers from './reducers';

injectTapEventPlugin();
const store = createStore(reducers);

ReactDOM.render((
  <MuiThemeProvider muiTheme={geekplanetTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
), document.getElementsByTagName('main')[0]);
