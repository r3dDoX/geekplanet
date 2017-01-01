import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import browserHistory from 'react-router/lib/browserHistory';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import fr from 'react-intl/locale-data/fr';
import it from 'react-intl/locale-data/it';
import Home from './home/home.jsx';
import Layout from './layout.jsx';
import FormsContainer from './forms/formsContainer';
import translationService from './i18n/translationService';
import ActionTypes from './actionTypes';
import AuthService from './auth/authService';

addLocaleData([...de, ...en, ...fr, ...it]);
const language = (navigator.languages && navigator.languages[0])
  || navigator.language
  || navigator.userLanguage;
let locale = language.toLowerCase().split(/[_-]+/)[0];
if (['de', 'en', 'fr', 'it'].indexOf(locale) === -1) {
  locale = 'de';
}

const auth = AuthService.create('XqZ2GTewejUuMTBPaiHJUuyOYlNwcaXV', 'geekplanet.eu.auth0.com');
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/' });
  }
};

class App extends React.Component {

  componentWillMount() {
    this.props.loadTranslations(locale);
  }

  render() {
    const { translations } = this.props;

    if (translations) {
      return (
        <IntlProvider locale={language} messages={translations}>
          <Router history={browserHistory}>
            <Route path="/" component={props => (<Layout auth={auth}>{props.children}</Layout>)}>
              <IndexRoute component={Home} />
              <Route path="forms" component={FormsContainer} onEnter={requireAuth} />
            </Route>
          </Router>
        </IntlProvider>
      );
    }

    // TODO show something until translations are ready
    return <div />;
  }
}

App.propTypes = {
  translations: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  loadTranslations: PropTypes.func,
};

export default connect(
  state => state.i18n,
  dispatch => ({
    loadTranslations(localeWithFallback) {
      translationService.loadTranslations(localeWithFallback).then(translations => dispatch({
        type: ActionTypes.TRANSLATIONS_LOADED,
        data: translations,
      }));
    },
  })
)(App);
