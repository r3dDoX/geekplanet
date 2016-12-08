import React, { PropTypes } from 'react';

const UploadImagePreview = props => (
  <div>
    {(props.files) ? Array.from(props.files).map((file, index) => <img key={index} alt="Preview" height="100px" src={URL.createObjectURL(file)} />) : ''}
  </div>
);

UploadImagePreview.propTypes = {
  files: PropTypes.instanceOf(FileList),
};

export default UploadImagePreview;
