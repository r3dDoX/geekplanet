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
          <DeleteIcon nativeColor={accent1Color} />
        </IconButton>
      </ListItem>
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

LinkArray.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
  })).isRequired,
};

export default LinkArray;
