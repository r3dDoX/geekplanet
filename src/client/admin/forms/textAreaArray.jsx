import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import styled from 'styled-components';
import TextField from '../../formHelpers/textField.jsx';
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
          multiLine
          rows={2}
        />
        <IconButton onClick={() => fields.remove(index)}>
          <DeleteIcon color={accent1Color} />
        </IconButton>
      </li>
    ))}
    <li>
      <RaisedButton
        primary
        label={<FormattedMessage id="COMMON.ADD" />}
        onClick={() => fields.push()}
      />
    </li>
  </List>
);

TextAreaArray.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TextAreaArray;
