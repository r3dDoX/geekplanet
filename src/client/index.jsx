import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import fr from 'react-intl/locale-data/fr';
import it from 'react-intl/locale-data/it';
import App from './app.jsx';
import reducers from './reducers';
import geekplanetTheme from './theme';

addLocaleData([...de, ...en, ...fr, ...it]);
const language = (navigator.languages && navigator.languages[0])
  || navigator.language
  || navigator.userLanguage;

injectTapEventPlugin();

const store = createStore(reducers);

ReactDOM.render((
  <Provider store={store}>
    <IntlProvider locale={language}>
      <MuiThemeProvider muiTheme={geekplanetTheme}>
        <App store={store} />
      </MuiThemeProvider>
    </IntlProvider>
  </Provider>
), document.getElementsByTagName('main')[0]);
