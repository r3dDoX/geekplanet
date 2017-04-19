import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import App from './app.jsx';
import geekplanetTheme from './theme';
import reducers from './reducers';

addLocaleData([...de]);

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = reducers;
    store.replaceReducer(nextRootReducer);
  });
}

export default () => (
  <MuiThemeProvider muiTheme={geekplanetTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
);
