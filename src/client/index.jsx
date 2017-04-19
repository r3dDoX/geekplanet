import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import WrappedApp from './wrappedApp.jsx';

injectTapEventPlugin();

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementsByTagName('main')[0]
  );
}

render(WrappedApp);

if (module.hot) {
  module.hot.accept('./wrappedApp.jsx', () => {
    render(WrappedApp);
  });
}

