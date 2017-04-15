import React from 'react';
import SelectField from 'material-ui/SelectField';

// eslint-disable-next-line
export default ({ input, label, meta: { touched, error }, children, ...rest }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    onChange={(event, index, value) => input.onChange(value)}
    autoWidth
    {...input}
    {...rest}
  >
    {children}
  </SelectField>
);
