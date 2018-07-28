import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const AuthorizedComponent = ({
  allowedRoles,
  roles,
  children,
}) => {
  if (roles.some(role => allowedRoles.includes(role))) {
    return children;
  }

  return null;
};

AuthorizedComponent.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(
  state => ({
    roles: state.auth.roles,
  })
)(AuthorizedComponent);
