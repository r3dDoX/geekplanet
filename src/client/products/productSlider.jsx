import React from 'react';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import styled from 'styled-components';
import { ProductPropType } from '../propTypes';
import { backgroundColor } from '../theme';
import { getPictureUrl } from './productService';

const ProductImage = styled.img`
  width: 100%;
`;

const StyledSlider = styled(Slider)`
  margin: 0 25px;
  
  .slick-prev, .slick-next {
    &:before {
      color: ${backgroundColor};
    }
  }
`;

const ProductSlider = ({ product }) => [
  <Helmet key="productDetailHead">
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    />
  </Helmet>,
  <meta
    key="imageMeta"
    itemProp="image"
    content={APP.BASE_URL + getPictureUrl(product.files[0])}
  />,
  <StyledSlider
    key="imageSlider"
    dots
    infinite
    speed={500}
    lazyLoad
  >
    {product.files.map(image => (
      <div key={`productImage_${image}`}>
        <ProductImage
          alt="Product"
          src={(screen.availWidth > 800)
            ? getPictureUrl(image, 'l')
            : getPictureUrl(image, 'm')
          }
        />
      </div>
    ))}
  </StyledSlider>,
];

ProductSlider.propTypes = {
  product: ProductPropType.isRequired,
};

export default ProductSlider;
