import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

// eslint-disable-next-line
export default ({ input: { onChange, value }, label, meta: { touched, error }, ...rest }) => (
  <AutoComplete
    hintText={label}
    errorText={touched && error}
    value={value}
    onNewRequest={(selected) => {
      if (typeof selected === 'object') {
        onChange(selected[rest.dataSourceConfig.value]);
      } else {
        onChange(selected);
      }
    }}
    {...rest}
  />
);

