import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  authService,
  roles,
  allowedRoles,
  ...rest
}) => (
  <Route
    render={(props) => {
      if (authService.loggedIn() &&
        (allowedRoles.length === 0 || allowedRoles.some(role => roles.indexOf(role) >= 0))) {
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

PrivateRoute.defaultProps = {
  allowedRoles: [],
};

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  authService: PropTypes.shape({
    loggedIn: PropTypes.func.isRequired,
  }).isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(connect(
  state => ({
    authService: state.auth.authService,
    roles: state.auth.roles,
  }),
  () => ({})
)(PrivateRoute));
