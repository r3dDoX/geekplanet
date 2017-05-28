import React from 'react';
import { shallow } from 'enzyme';
import ProductTile from './productTile.jsx';

describe('ProductTile', () => {
  let props;
  const productTile = () => shallow(
    <ProductTile {...props} />
  );

  beforeEach(() => {
    props = {
      locale: 'de',
      product: {
        de: {
          name: 'testProduct',
          shortDescription: 'testShortDescription',
        },
        stock: 1,
        price: 30.25,
        files: [],
      },
      addItemToShoppingCart: undefined,
    };
  });

  it('should not render CardMedia when no files given', () => {
    const cardMedia = productTile().find('CardMedia');

    expect(cardMedia.length).toBe(0);
  });

  it('should render CardMedia with first image', () => {
    props.product.files = [
      'testFile',
      'testFile2',
    ];

    const cardMedia = productTile().find('CardMedia');

    expect(cardMedia.length).toBe(1);
    expect(cardMedia.find('img').props().src).toEqual(expect.stringContaining(props.product.files[0]));
  });

  it('should render CardMedia with small image', () => {
    props.product.files = [
      'testFile',
    ];

    const cardMedia = productTile().find('CardMedia');

    expect(cardMedia.length).toBe(1);
    expect(cardMedia.find('img').props().src).toEqual(expect.stringContaining(`${props.product.files[0]}_s`));
  });
});
