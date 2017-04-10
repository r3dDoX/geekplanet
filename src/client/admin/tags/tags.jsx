import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '4px',
  },
};

const Tags = ({ savedTags, tags, selectTag, removeTag }) => (
  <div>
    <AutoComplete
      floatingLabelText="Tags"
      filter={AutoComplete.caseInsensitiveFilter}
      dataSource={savedTags}
      onNewRequest={(item, index) => selectTag(tags, item, index)}
    />
    <br />
    <div style={styles.container}>
      {tags.map(tag =>
        <Chip
          key={tag}
          onRequestDelete={() => removeTag(tags, tag)}
          style={styles.chip}
        >
          {tag}
        </Chip>
      )}
    </div>
  </div>
);

Tags.propTypes = {
  savedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
};

export default Tags;
