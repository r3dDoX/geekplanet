import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

// eslint-disable-next-line
export default ({ input, label, style, selectedValue, multiple = false, meta: { touched, error }, children }) => (
  <FormControl error={touched && error !== undefined}>
    <Select
      label={label}
      {...input}
      {...selectedValue ? { value: selectedValue } : {}}
      onChange={(event, index, value) => input.onChange(value)}
      autoWidth
      multiple={multiple}
    >
      {children}
    </Select>
    {touched && error && (
      <FormHelperText>
        {error}
      </FormHelperText>
    )}
  </FormControl>
);
