import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem/index';
import Paper from '@material-ui/core/Paper/index';
import TextField from '@material-ui/core/TextField';
import Downshift from 'downshift';
import keycode from 'keycode';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { TagPropType } from '../../propTypes';

const StyledTag = styled(Chip)`
  margin-bottom: 4px !important;
  margin-right: 4px !important;
`;

class TagSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }

  onSelect({ name }) {
    const { tags, selectTag } = this.props;

    selectTag(tags, name);
    this.setState({
      inputValue: '',
    });
  }

  handleKeyDown(event) {
    const { tags, removeTag } = this.props;
    const { inputValue } = this.state;

    if (tags.length && !inputValue.length && keycode(event) === 'backspace') {
      removeTag(tags, tags[tags.length - 1]);
    }
  }

  render() {
    const {
      savedTags,
      tags,
      removeTag,
    } = this.props;

    return (
      <div>
        <Downshift
          inputValue={this.state.inputValue}
          onSelect={tag => this.onSelect(tag)}
          selectedItem={tags}
          itemToString={({ name }) => name}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            highlightedIndex,
            selectedItem,
          }) => (
            <div>
              <TextField
                InputProps={getInputProps({
                  startAdornment: selectedItem.map(tag => (
                    <StyledTag
                      key={tag}
                      tabIndex={-1}
                      onDelete={() => removeTag(tags, tag)}
                      label={tag}
                    />
                  )),
                  onChange: event => this.setState({ inputValue: event.target.value }),
                  onKeyDown: event => this.handleKeyDown(event),
                  placeholder: 'TagSelector',
                })}
                fullWidth
              />
              {isOpen ? (
                <Paper square>
                  {savedTags
                    .filter(({ name }) =>
                      !selectedItem.includes(name)
                      && name.toLowerCase().includes(this.state.inputValue.toLowerCase())
                    )
                    .map((tag, index) => (
                      <MenuItem
                        {...getItemProps({ item: tag })}
                        key={tag._id}
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
      </div>
    );
  }
}

TagSelector.propTypes = {
  savedTags: PropTypes.arrayOf(TagPropType).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
};

export default TagSelector;
