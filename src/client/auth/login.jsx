import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { withRouter, Redirect } from 'react-router-dom';
import { store, load, ids } from '../storage';
import { createFinishedAuth, createLoggedIn, createProcessingAuth, createRegistrationSuccessful } from '../actions';
import authService from './authService';
import LoginForm from './loginForm.jsx';

export const LoginComponent = ({
  location: {
    from,
    hash,
  },
  isAuthenticating,
  loggedIn,
  signedUp,
  authenticating,
  authenticationFinished,
}) => {
  if (!authService.loggedIn()) {
    if (/access_token|id_token|error/.test(hash)) {
      authService.handleAuthentication(loggedIn);
    } else if (from) {
      store(ids.REDIRECT_URI, from.pathname);
    } else {
      store(ids.REDIRECT_URI, '/');
    }

    return (
      <LoginForm
        isAuthenticating={isAuthenticating}
        onSubmit={(values) => {
          authenticating();

          if (values.submit === 'login') {
            return authService.login(values.username, values.password)
              .then(loggedIn)
              .catch((error) => {
                authenticationFinished();
                throw new SubmissionError({
                  _error: error,
                });
              });
          }

          return authService.signUp(values.username, values.password)
            .then(signedUp)
            .catch((error) => {
              authenticationFinished();
              throw new SubmissionError({
                _error: error,
              });
            });
        }}
      />
    );
  }

  return (
    <Redirect
      to={{
        pathname: load(ids.REDIRECT_URI) || '/',
      }}
    />
  );
};

LoginComponent.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    from: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  isAuthenticating: PropTypes.boolean.isRequired,
  loggedIn: PropTypes.func.isRequired,
  signedUp: PropTypes.func.isRequired,
  authenticating: PropTypes.func.isRequired,
  authenticationFinished: PropTypes.func.isRequired,
};

export default withRouter(connect(
  state => ({
    isAuthenticating: state.auth.isAuthenticating,
  }),
  dispatch => ({
    loggedIn(tokenPayload) {
      dispatch(createLoggedIn(tokenPayload));
    },
    signedUp() {
      dispatch(createRegistrationSuccessful());
    },
    authenticating() {
      dispatch(createProcessingAuth());
    },
    authenticationFinished() {
      dispatch(createFinishedAuth());
    },
  }),
)(LoginComponent));
