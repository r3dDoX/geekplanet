import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Link from 'react-router/lib/Link';
import ActionTypes from './actionTypes';

const styles = {
  container: {
    paddingTop: '60px',
  },
  appBar: {
    position: 'fixed',
    top: 0,
  },
  title: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

const Layout = ({ authService, loggedIn, roles, logout, children }) => {
  const executeLogout = () => {
    authService.logout();
    logout();
  };

  return (
    <div style={styles.container}>
      <AppBar
        title={<Link to="/" style={styles.title}>geekplanet</Link>}
        showMenuIconButton={false}
        iconElementRight={loggedIn ?
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            {
              roles.includes('admin') ?
                <MenuItem primaryText="Forms" containerElement={<Link to="/forms">Forms</Link>} />
                : null
            }
            <MenuItem primaryText="Logout" onClick={executeLogout} />
          </IconMenu>
          :
          <FlatButton label="Login" primary onClick={() => authService.login()} />
        }
        style={styles.appBar}
        zDepth={0}
      />
      {children}
    </div>
  );
};

Layout.propTypes = {
  logout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  authService: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }),
  children: PropTypes.element.isRequired,
};

export default connect(
  state => state.auth,
  dispatch => ({
    logout() {
      dispatch({
        type: ActionTypes.LOGGED_OUT,
      });
    },
  })
)(Layout);

