import GridListTileBar from '@material-ui/core/GridListTileBar';
import React from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { getPictureUrl } from '../../products/productService';

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

const UploadImagePreview = ({ files, removeFile }) => (
  <div style={styles.root}>
    { files ? (
      <GridList cols={2.2} style={styles.gridList}>
        {Array.from(files).map(file => (
          <GridListTile
            key={file}
            title={file}
          >
            <img alt="Product" src={getPictureUrl(file)} />
            <GridListTileBar
              actionIcon={
                <IconButton onClick={() => removeFile(files, file)}>
                  <Delete nativeColor="rgb(255, 255, 255)" />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    ) : null}
  </div>
);

UploadImagePreview.propTypes = {
  files: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeFile: PropTypes.func.isRequired,
};

export default UploadImagePreview;
