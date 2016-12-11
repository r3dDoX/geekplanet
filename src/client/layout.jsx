import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

const Layout = props => (
  <div>
    <AppBar title="Geekplanet" />
    <div className="content">
      {props.children}
    </div>
  </div>
);


Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
