import React from 'react';
import TextField from 'material-ui/TextField';

// eslint-disable-next-line
export default ({ input, label, type, min, max, meta: { touched, error }, style }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    type={type}
    min={min}
    max={max}
    style={style}
    {...input}
  />
);

