import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  min-width: 140px;
`;

/* eslint-disable react/prop-types */
export default ({
  input,
  label,
  selectedValue,
  multiple = false,
  meta: { touched, error },
  children,
}) => (
  <FormControl error={touched && error !== undefined}>
    <InputLabel htmlFor={input.name}>
      {label}
    </InputLabel>
    <StyledSelect
      {...input}
      {...selectedValue ? { value: selectedValue } : {}}
      onChange={event => input.onChange(event.target.value)}
      autoWidth
      multiple={multiple}
      inputProps={{
        name: input.name,
        id: input.name,
      }}
    >
      {children}
    </StyledSelect>
    {touched && error && (
      <FormHelperText>
        {error}
      </FormHelperText>
    )}
  </FormControl>
);
