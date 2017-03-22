import React from 'react';
import TextField from 'material-ui/TextField';

// eslint-disable-next-line
export default ({ input, label, type, min, max, multiLine, rows, step, meta: { touched, error }, style }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    type={type}
    min={min}
    max={max}
    multiLine={multiLine}
    rows={rows}
    step={step}
    style={style}
    {...input}
  />
);

