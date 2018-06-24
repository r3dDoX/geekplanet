import React from 'react';
import Input from '@material-ui/core/Input';

// eslint-disable-next-line
export default ({ input, label, meta: { touched, error }, ...rest }) => (
  <Input
    placeholder={label}
    error={touched && error !== undefined}
    {...input}
    {...rest}
  />
);
