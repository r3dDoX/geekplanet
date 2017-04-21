import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import App from './app.jsx';
import geekplanetTheme from './theme';

const WrappedApp = ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={geekplanetTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>
);

WrappedApp.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default WrappedApp;
