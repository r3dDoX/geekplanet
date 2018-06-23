import React from 'react';
import Select from '@material-ui/core/Select';

// eslint-disable-next-line
export default ({ input, label, style, selectedValue, multiple = false, meta: { touched, error }, children }) => (
  <Select
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
  </Select>
);
