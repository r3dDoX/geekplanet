import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
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

const Layout = props => (
  <div style={styles.container}>
    <AppBar
      title={<Link to="/" style={styles.title}>Geekplanet</Link>}
      showMenuIconButton={false}
      iconElementRight={
        <FlatButton label="Forms" containerElement={<Link to="/forms">Forms</Link>} />
      }
      style={styles.appBar}
      zDepth={0}
    />
    {props.children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
