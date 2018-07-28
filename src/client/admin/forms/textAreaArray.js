import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import styled from 'styled-components';
import TextField from '../../formHelpers/textField';
import { accent1Color } from '../../theme';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const TextAreaArray = ({ fields }) => (
  <List>
    {fields.map((fieldValue, index) => (
      <li key={fieldValue}>
        <Field
          name={fieldValue}
          component={TextField}
          type="text"
          multiline
          rows={2}
        />
        <IconButton onClick={() => fields.remove(index)}>
          <DeleteIcon nativeColor={accent1Color} />
        </IconButton>
      </li>
    ))}
    <li>
      <Button
        variant="contained"
        color="primary"
        onClick={() => fields.push()}
      >
        <FormattedMessage id="COMMON.ADD" />
      </Button>
    </li>
  </List>
);

TextAreaArray.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TextAreaArray;
