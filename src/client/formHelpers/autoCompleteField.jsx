import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

// eslint-disable-next-line
export default ({ input: { onChange, value }, label, meta: { touched, error }, dataSource, dataSourceConfig, ...rest }) => (
  <AutoComplete
    hintText={value
      ? (dataSource.find(data => data[dataSourceConfig.value] === value) || {})[dataSourceConfig.text]
      : label
    }
    errorText={touched && error}
    dataSource={dataSource}
    dataSourceConfig={dataSourceConfig}
    onNewRequest={(selected) => {
      if (typeof selected === 'object') {
        onChange(selected[dataSourceConfig.value]);
      } else {
        onChange(selected);
      }
    }}
    {...rest}
  />
);
