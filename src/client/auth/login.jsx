import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { store, load, ids } from '../storage';
import MainSpinner from '../layout/mainSpinner.jsx';

export const LoginComponent = ({
  authService,
  location: {
    from,
    hash,
  },
}) => {
  if (authService.loggedIn()) {
    return (
      <Redirect
        to={{
          pathname: load(ids.REDIRECT_URI) || '/',
        }}
      />
    );
  } else if (!hash.includes('id_token')) {
    if (from) {
      store(ids.REDIRECT_URI, from.pathname);
    } else {
      store(ids.REDIRECT_URI, '/');
    }
    setTimeout(() => authService.login(), 1);
  }

  return <MainSpinner />;
};

LoginComponent.propTypes = {
  authService: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    from: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default withRouter(connect(
  state => ({
    authService: state.auth.authService,
  }),
  () => ({})
)(LoginComponent));
