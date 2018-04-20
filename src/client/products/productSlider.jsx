import NavigationLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationRight from 'material-ui/svg-icons/navigation/chevron-right';
import Fullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import React from 'react';
import ImageGallery from 'react-image-gallery';
import styled from 'styled-components';
import { ProductPropType } from '../propTypes';
import { backgroundColor } from '../theme';
import { getPictureUrl } from './productService';

const ArrowIcon = styled.div`
  width: 48px !important;
  height: 48px !important;
  color: ${backgroundColor} !important;
  filter: drop-shadow( 0px 0px 4px white);
`;

const LeftArrowIcon = ArrowIcon.withComponent(NavigationLeft);
const RightArrowIcon = ArrowIcon.withComponent(NavigationRight);

const ArrowContainer = styled.a`
  position: absolute;
  top: 50%;
  padding: 15px;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
  outline: none;
`;

const LeftArrowContainer = ArrowContainer.extend`
  left: 0;
`;

const RightArrowContainer = ArrowContainer.extend`
  right: 0;
`;

const FullscreenContainer = styled.a`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  cursor: pointer;
  padding-right: 15px;
  outline: none;
`;

const FullscreenIcon = styled(Fullscreen)`
  width: 42px;
  height: 42px;
  color: ${backgroundColor};
  filter: drop-shadow( 0px 0px 4px white);
`;

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
    renderLeftNav={(onClick, disabled) => {
      if (!disabled) {
        return (
          <LeftArrowContainer
            onClick={onClick}
            role="button"
            tabIndex={0}
          >
            <LeftArrowIcon />
          </LeftArrowContainer>
        );
      }

      return null;
    }}
    renderRightNav={(onClick, disabled) => {
      if (!disabled) {
        return (
          <RightArrowContainer
            onClick={onClick}
            role="button"
            tabIndex={0}
          >
            <RightArrowIcon />
          </RightArrowContainer>
        );
      }

      return null;
    }}
    renderFullscreenButton={onClick => (
      <FullscreenContainer
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        <FullscreenIcon />
      </FullscreenContainer>
    )}
  />,
];

ProductSlider.propTypes = {
  product: ProductPropType.isRequired,
};

export default ProductSlider;
