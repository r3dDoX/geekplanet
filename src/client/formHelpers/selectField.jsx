import React from 'react';
import SelectField from 'material-ui/SelectField';

// eslint-disable-next-line
export default ({ input, label, style, selectedValue = '', meta: { touched, error }, children }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    value={selectedValue}
    onChange={(event, index, value) => input.onChange(value)}
    style={style}
    autoWidth
  >
    {children}
  </SelectField>
);
