import React from 'react';
import TextField from 'material-ui/TextField';

// eslint-disable-next-line
export default ({ input, label, meta: { touched, error }, ...rest }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...rest}
  />
);
