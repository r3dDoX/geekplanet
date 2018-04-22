import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { ProductPropType } from '../propTypes';
import { backgroundColor } from '../theme';
import { getPictureUrl } from './productService';

const ProductPicture = styled.picture`
  width: 100%;
`;

const ProductImage = styled.img`
  width: 100%;
`;

const StyledSlider = styled(Slider)`
  margin: 0 25px 40px;
  
  .slick-prev, .slick-next {
    &:before {
      color: ${backgroundColor};
    }
  }
`;

const ProductSlider = ({ product }) => [
  ...product.files.map(image => (
    <meta
      key={`imageMeta_${image}`}
      itemProp="image"
      content={APP.BASE_URL + getPictureUrl(image, 'l')}
    />
  )),
  <StyledSlider
    key="imageSlider"
    dots
    infinite
    speed={500}
    lazyLoad
  >
    {product.files.map(image => (
      <div key={`productImage_${image}`}>
        <ProductPicture>
          <source
            media="(max-width: 450px)"
            srcSet={`${getPictureUrl(image, 's')} 1x, ${getPictureUrl(image, 'm')} 2x`}
          />
          <source
            media="(max-width: 800px)"
            srcSet={`${getPictureUrl(image, 'm')} 1x, ${getPictureUrl(image, 'l')} 2x`}
          />
          <ProductImage src={getPictureUrl(image, 'l')} alt="Product" />
        </ProductPicture>
      </div>
    ))}
  </StyledSlider>,
];

ProductSlider.propTypes = {
  product: ProductPropType.isRequired,
};

export default ProductSlider;
