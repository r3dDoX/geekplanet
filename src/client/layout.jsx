import React from 'react';
import AppBar from 'material-ui/AppBar';

export default (props) => (
  <div>
    <AppBar title="Geekplanet" />
    <div className="content">
      {props.children}
    </div>
  </div>
);