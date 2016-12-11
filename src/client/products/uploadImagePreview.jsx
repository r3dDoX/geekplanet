import React, { PropTypes } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

const containerStyle = {
  marginTop: '20px',
};

const UploadImagePreview = props => (
  <div style={containerStyle}>
    { props.files ? (
      <GridList cols={3}>
        {Array.from(props.files).map((file, index) => (
          <GridTile
            key={index}
            title={file.name}
          >
            <img alt={file.name} src={URL.createObjectURL(file)} />
          </GridTile>
        ))}
      </GridList>
    ) : null}
  </div>
);

UploadImagePreview.propTypes = {
  files: PropTypes.instanceOf(FileList),
};

export default UploadImagePreview;
