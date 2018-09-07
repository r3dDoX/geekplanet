import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem/index';
import Paper from '@material-ui/core/Paper/index';
import MaterialTextField from '@material-ui/core/TextField';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import actions from 'redux-form/es/actions';
import styled from 'styled-components';
import TextField from '../../formHelpers/textField';
import { TagPropType } from '../../propTypes';
import { createLoadTags } from '../adminActions';
import TagService from './tagService';

const { initialize } = actions;

const FormContainer = styled.form`
  padding: 24px;
`;

const ClearButton = styled(Button)`
  margin-right: 10px !important;
`;

const formName = 'tags';

class TagForm extends React.Component {
  constructor(props) {
    super(props);

    this.downshiftInstance = React.createRef();
  }

  render() {
    const {
      handleSubmit,
      onSubmit,
      selectTag,
      clearForm,
      savedTags: tags,
    } = this.props;

    return (
      <FormContainer
        name={formName}
        onSubmit={(...props) => {
          handleSubmit(onSubmit)(...props);
          this.downshiftInstance.current.clearSelection();
        }}
      >
        <Downshift
          onSelect={selectTag}
          itemToString={tag => (tag ? tag.name : '')}
          ref={this.downshiftInstance}
        >
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <MaterialTextField
                InputProps={{
                  ...getInputProps({
                    placeholder: 'Create New',
                    id: 'select-tag',
                  }),
                }}
              />
              {isOpen ? (
                <Paper square>
                  {tags
                    .filter(({ name }) => name.toLowerCase().includes(inputValue.toLowerCase()))
                    .map((tag, index) => (
                      <MenuItem
                        {...getItemProps({ item: tag })}
                        key={tag.name}
                        selected={highlightedIndex === index}
                        component="div"
                      >
                        {tag.name}
                      </MenuItem>
                    ))
                  }
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
        <br />
        <Field
          component={TextField}
          name="_id"
          label=""
          type="text"
          style={{ display: 'none' }}
        />
        <Field
          component={TextField}
          name="name"
          label="Name"
          type="text"
        />
        <br />
        {this.downshiftInstance.current && this.downshiftInstance.current.state.inputValue && (
          <ClearButton
            onClick={() => {
              this.downshiftInstance.current.clearSelection();
              clearForm();
            }}
            variant="contained"
            type="button"
          >
            Clear
          </ClearButton>
        )}
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </FormContainer>
    );
  }
}

TagForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectTag: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
  savedTags: PropTypes.arrayOf(TagPropType).isRequired,
};

export default connect(
  state => state.forms,
  (dispatch) => {
    function clearForm() {
      dispatch(initialize(formName));
    }

    function loadTags() {
      dispatch(createLoadTags());
    }

    return {
      clearForm,
      selectTag(tag) {
        dispatch(initialize(formName, tag));
      },
      onSubmit(tag) {
        TagService
          .saveTag(tag)
          .then(loadTags)
          .then(clearForm);
      },
    };
  },
)(reduxForm({
  form: formName,
  destroyOnUnmount: false,
})(TagForm));
