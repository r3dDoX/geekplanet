import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Downshift from 'downshift';
import React from 'react';


// eslint-disable-next-line
export default ({ input: { onChange, value, name }, label, meta: { touched, error }, dataSource, onSelect, ...rest }) => (
  <Downshift
    onSelect={onSelect}
    itemToString={item => (item ? item.name : '')}
    {...rest}
  >
    {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
      <div>
        <TextField
          InputProps={{
            ...getInputProps({
              placeholder: label,
              id: 'select-tag',
              name,
            }),
          }}
        />
        {isOpen ? (
          <Paper square>
            {dataSource
              .filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()))
              .map((item, index) => (
                <MenuItem
                  {...getItemProps({ item })}
                  key={item.value}
                  selected={highlightedIndex === index}
                  component="div"
                >
                  {item.name}
                </MenuItem>
              ))
            }
          </Paper>
        ) : null}
      </div>
    )}
  </Downshift>
);
