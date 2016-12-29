import React, { PropTypes } from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import browserHistory from 'react-router/lib/browserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import Home from './home/home.jsx';
import Layout from './layout.jsx';
import FormsContainer from './forms/formsContainer';

class App extends React.Component {

  componentWillMount() {
    // TODO load translations
  }

  render() {
    const history = syncHistoryWithStore(browserHistory, this.props.store);

    return (
      <Router history={history}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} />
          <Route path="forms" component={FormsContainer} />
        </Route>
      </Router>
    );
  }
}

App.propTypes = {
  store: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default App;
