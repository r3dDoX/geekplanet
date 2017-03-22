import React, { PropTypes } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '20px',
    marginBottom: '20px',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
};

const UploadImagePreview = ({ files }) => (
  <div style={styles.root}>
    { files ? (
      <GridList cols={2.2} style={styles.gridList}>
        {Array.from(files).map(file => (
          <GridTile
            key={file.name}
            title={file.name}
          >
            <img alt={file.name} src={URL.createObjectURL(file)} />
          </GridTile>
        ))}
      </GridList>
    ) : null}
  </div>
);

UploadImagePreview.defaultProps = {
  files: undefined,
};

UploadImagePreview.propTypes = {
  files: PropTypes.instanceOf(FileList),
};

export default UploadImagePreview;
