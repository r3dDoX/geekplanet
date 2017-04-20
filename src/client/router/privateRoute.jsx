import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  authService,
  ...rest
}) => (
  <Route
    render={(props) => {
      if (authService.loggedIn()) {
        return <Component {...props} />;
      }

      return (
        <Redirect
          to={{
            pathname: '/login',
            from: props.location,
          }}
        />
      );
    }}
    {...rest}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  authService: PropTypes.shape({
    loggedIn: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(connect(
  state => ({ authService: state.auth.authService }),
  () => ({})
)(PrivateRoute));
