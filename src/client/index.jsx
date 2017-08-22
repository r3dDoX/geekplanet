import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';
import 'react-image-gallery/styles/css/image-gallery.css';
import WrappedApp from './wrappedApp.jsx';
import setupStore from './reducers/setupStore';
import authService from './auth/authService';

injectTapEventPlugin();
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
