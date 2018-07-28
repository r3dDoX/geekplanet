import React from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import authService from '../auth/authService';

const PrivateRoute = ({
  component: Component,
  roles,
  allowedRoles,
  ...rest
}) => (
  <Route
    render={(props) => {
      if (authService.loggedIn()
        && (allowedRoles.length === 0 || allowedRoles.some(role => roles.indexOf(role) >= 0))) {
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
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(connect(
  state => ({
    roles: state.auth.roles,
  }),
  () => ({})
)(PrivateRoute));
