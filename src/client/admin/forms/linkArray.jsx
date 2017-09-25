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

const ListItem = styled.li`
  display: flex;
  align-items: center;
`;

const LinkArray = ({ fields }) => (
  <List>
    {fields.map((fieldValue, index) => (
      <ListItem key={fieldValue}>
        <div>
          <Field
            label="Text"
            name={`${fieldValue}.text`}
            component={TextField}
            type="text"
          />
          <Field
            label="Link"
            name={`${fieldValue}.href`}
            component={TextField}
            type="text"
          />
        </div>
        <IconButton onClick={() => fields.remove(index)}>
          <DeleteIcon color={accent1Color} />
        </IconButton>
      </ListItem>
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

LinkArray.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
  })).isRequired,
};

export default LinkArray;
