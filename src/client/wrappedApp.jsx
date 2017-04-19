import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import App from './app.jsx';
import geekplanetTheme from './theme';
import setupStore from './reducers/setupStore';

export default () => (
  <MuiThemeProvider muiTheme={geekplanetTheme}>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </MuiThemeProvider>
);
