import { createStore } from 'redux';
import rootReducer from './root.reducer';

export default () => {
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  if (module.hot) {
    module.hot.accept('./root.reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};
