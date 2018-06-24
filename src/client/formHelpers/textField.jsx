import React from 'react';
import TextField from '@material-ui/core/TextField';

// eslint-disable-next-line
export default ({ input, label, meta: { touched, error }, ...rest }) => (
  <TextField
    label={label}
    error={touched && error !== undefined}
    helperText={touched && error}
    {...input}
    {...rest}
  />
);
