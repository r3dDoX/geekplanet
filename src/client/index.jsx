/* eslint-disable import/first */
import './errorHandler';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import authService from './auth/authService';
import './extension';
import setupStore from './reducers/setupStore';
import WrappedApp from './wrappedApp.jsx';

addLocaleData([...de]);
authService.init();
const store = setupStore();

const renderApp = () => {
  render(
    <AppContainer>
      <WrappedApp store={store} />
    </AppContainer>,
    document.getElementsByTagName('main')[0]
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./wrappedApp.jsx', renderApp);
}
