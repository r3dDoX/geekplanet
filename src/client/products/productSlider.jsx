import NavigationLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationRight from 'material-ui/svg-icons/navigation/chevron-right';
import Fullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import React from 'react';
import ImageGallery from 'react-image-gallery';
import { getPictureUrl } from './productService';
import { backgroundColor } from '../theme';
import { ProductPropType } from '../propTypes';

const arrowContainerStyle = {
  position: 'absolute',
  top: '50%',
  padding: '50px 15px',
  transform: 'translateY(-50%)',
  zIndex: 1,
  cursor: 'pointer',
  outline: 'none',
};

const styles = {
  leftArrowContainer: Object.assign({
    left: 0,
  }, arrowContainerStyle),
  rightArrowContainer: Object.assign({
    right: 0,
  }, arrowContainerStyle),
  icons: {
    width: '48px',
    height: '48px',
    color: backgroundColor,
    filter: 'drop-shadow( 0px 0px 4px white)',
  },
  fullscreenContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 1,
    cursor: 'pointer',
    padding: '15px',
    outline: 'none',
  },
};

const ProductSlider = ({ product }) => (
  <ImageGallery
    items={product.files.map(image => ({
      original: getPictureUrl(image, 'l'),
      thumbnail: getPictureUrl(image, 's'),
    }))}
    lazyLoad
    showPlayButton={false}
    thumbnailPosition="left"
    renderLeftNav={(onClick, disabled) => {
      if (!disabled) {
        return (
          <a
            onClick={onClick}
            style={styles.leftArrowContainer}
            role="button"
            tabIndex={0}
          >
            <NavigationLeft style={styles.icons} />
          </a>
        );
      }

      return null;
    }}
    renderRightNav={(onClick, disabled) => {
      if (!disabled) {
        return (
          <a
            onClick={onClick}
            style={styles.rightArrowContainer}
            role="button"
            tabIndex={0}
          >
            <NavigationRight style={styles.icons} />
          </a>
        );
      }

      return null;
    }}
    renderFullscreenButton={onClick => (
      <a
        onClick={onClick}
        style={styles.fullscreenContainer}
        role="button"
        tabIndex={0}
      >
        <Fullscreen style={styles.icons} />
      </a>
    )}
  />
);

ProductSlider.propTypes = {
  product: ProductPropType.isRequired,
};

export default ProductSlider;
