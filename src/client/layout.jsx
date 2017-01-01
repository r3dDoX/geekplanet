import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Link from 'react-router/lib/Link';

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

const Layout = ({ auth, children }) => (
  <div style={styles.container}>
    <AppBar
      title={<Link to="/" style={styles.title}>Geekplanet</Link>}
      showMenuIconButton={false}
      iconElementRight={auth.loggedIn() ?
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Forms" containerElement={<Link to="/forms">Forms</Link>} />
          <MenuItem primaryText="Logout" onClick={() => auth.logout()} />
        </IconMenu>
        :
        <FlatButton label="Login" primary onClick={() => auth.login()} />
      }
      style={styles.appBar}
      zDepth={0}
    />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  auth: PropTypes.shape({
    loggedIn: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  }),
};

export default Layout;
