import NavigationLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationRight from 'material-ui/svg-icons/navigation/chevron-right';
import Fullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import React from 'react';
import ImageGallery from 'react-image-gallery';
import { ProductPropType } from '../propTypes';
import { backgroundColor } from '../theme';
import { getPictureUrl } from './productService';

const arrowContainerStyle = {
  position: 'absolute',
  top: '50%',
  padding: '15px',
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
  fullscreenIcon: {
    width: '42px',
    height: '42px',
    color: backgroundColor,
    filter: 'drop-shadow( 0px 0px 4px white)',
  },
  fullscreenContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 1,
    cursor: 'pointer',
    paddingRight: '15px',
    outline: 'none',
  },
};

const ProductSlider = ({ product }) => [
  <meta
    key="imageMeta"
    itemProp="image"
    content={APP.BASE_URL + getPictureUrl(product.files[0])}
  />,
  <ImageGallery
    key="imageSlider"
    items={product.files.map(image => ({
      original: (screen.availWidth > 800) ? getPictureUrl(image, 'l') : getPictureUrl(image, 'm'),
      thumbnail: getPictureUrl(image, 's'),
    }))}
    defaultImage="/assets/images/notFound.jpg"
    lazyLoad
    showPlayButton={false}
    showThumbnails={product.files.length > 1}
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
        <Fullscreen style={styles.fullscreenIcon} />
      </a>
    )}
  />,
];

ProductSlider.propTypes = {
  product: ProductPropType.isRequired,
};

export default ProductSlider;
