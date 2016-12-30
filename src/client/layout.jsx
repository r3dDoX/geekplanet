import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Link from 'react-router/lib/Link';

const styles = {
  title: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

const Layout = props => (
  <div>
    <AppBar
      title={<Link to="/" style={styles.title}>Geekplanet</Link>}
      iconElementRight={
        <FlatButton label="Forms" containerElement={<Link to="/forms" />} />
      }
      zDepth="0"
    />
    {props.children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
