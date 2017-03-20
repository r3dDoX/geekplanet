import React from 'react';
import SelectField from 'material-ui/SelectField';

// eslint-disable-next-line
export default ({ input, label, meta: { touched, error }, children }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    autoWidth
  >
    {children}
  </SelectField>
);
