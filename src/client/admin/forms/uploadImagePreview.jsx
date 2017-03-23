import React, { PropTypes } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import ProductService from '../../products/productService';

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
          <GridTile
            key={file}
            title={file}
            actionIcon={
              <IconButton onClick={() => removeFile(files, file)}>
                <Delete color="rgb(255, 255, 255)" />
              </IconButton>
            }
          >
            <img alt="Product" src={ProductService.getPictureUrl(file)} />
          </GridTile>
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
