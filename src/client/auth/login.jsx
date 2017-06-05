import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { store, load, ids } from '../storage';
import { createLoggedIn, createRegistrationSuccessful } from '../actions';
import authService from './authService';
import LoginForm from './loginForm.jsx';

export const LoginComponent = ({
  email,
  location: {
    from,
    hash,
  },
  loggedIn,
  signedUp,
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
        email={email}
        dispatchLoggedIn={loggedIn}
        dispatchSignedUp={signedUp}
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
  email: PropTypes.string.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    from: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  loggedIn: PropTypes.func.isRequired,
  signedUp: PropTypes.func.isRequired,
};

export default withRouter(connect(
  state => ({
    email: state.auth.email,
  }),
  dispatch => ({
    loggedIn(tokenPayload) {
      dispatch(createLoggedIn(tokenPayload));
    },
    signedUp(email) {
      dispatch(createRegistrationSuccessful(email));
    },
  }),
)(LoginComponent));
