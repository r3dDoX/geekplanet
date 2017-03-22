import React, { PropTypes } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
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
  }
};

const UploadImagePreview = ({ files }) => (
  <div style={styles.root}>
    { files ? (
      <GridList cols={2.2} style={styles.gridList}>
        {Array.from(files).map(file => (
          <GridTile
            key={file}
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
};

export default UploadImagePreview;
