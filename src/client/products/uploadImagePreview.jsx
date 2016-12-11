import React, { PropTypes } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
};

const UploadImagePreview = props => (
  <div style={styles.root}>
    { props.files ? (
      <GridList cols={2.2} style={styles.gridList}>
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
