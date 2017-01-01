import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Link from 'react-router/lib/Link';
import * as AuthService from './auth/authService';

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

const Layout = ({ auth, children }) => {
  return (
    <div style={styles.container}>
      <AppBar
        title={<Link to="/" style={styles.title}>Geekplanet</Link>}
        showMenuIconButton={false}
        iconElementRight={auth.loggedIn() ?
          <FlatButton label="Forms" containerElement={<Link to="/forms">Forms</Link>} /> :
          <FlatButton label="Login" primary onClick={() => auth.login()} />
        }
        style={styles.appBar}
        zDepth={0}
      />
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  auth: PropTypes.shape(AuthService.Prototype),
};

export default Layout;
