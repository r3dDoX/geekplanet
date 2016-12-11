import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

const Layout = props => (
  <div>
    <AppBar title="Geekplanet" />
    {props.children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
