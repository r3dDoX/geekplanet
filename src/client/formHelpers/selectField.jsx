import React from 'react';
import SelectField from 'material-ui/SelectField';

// eslint-disable-next-line
export default ({ input, label, style, selectedValue, multiple = false, meta: { touched, error }, children }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...selectedValue ? { value: selectedValue } : {}}
    onChange={(event, index, value) => input.onChange(value)}
    style={style}
    autoWidth
    multiple={multiple}
  >
    {children}
  </SelectField>
);
