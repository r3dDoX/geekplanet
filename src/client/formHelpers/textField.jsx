import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
  margin-top: 10px !important;
  margin-bottom: 10px !important;
`;

// eslint-disable-next-line
export default ({ input, label, meta: { touched, error }, ...rest }) => (
  <StyledTextField
    label={label}
    error={touched && error !== undefined}
    helperText={touched && error}
    {...input}
    {...rest}
  />
);
