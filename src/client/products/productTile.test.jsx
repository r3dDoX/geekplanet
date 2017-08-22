import React from 'react';
import { shallow } from 'enzyme';
import { ProductTileComponent as ProductTile } from './productTile.jsx';

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
      history: {
        push() {},
      },
    };
  });

  it('should not render product picture when no files given', () => {
    const productPicture = productTile().find('img');

    expect(productPicture.length).toBe(0);
  });

  it('should render product picture with first image', () => {
    props.product.files = [
      'testFile',
      'testFile2',
    ];

    const productPicture = productTile().find('img');

    expect(productPicture.length).toBe(1);
    expect(productPicture.find('img').props().src).toEqual(expect.stringContaining(props.product.files[0]));
  });

  it('should render product picture with small image', () => {
    props.product.files = [
      'testFile',
    ];

    const productPicture = productTile().find('img');

    expect(productPicture.length).toBe(1);
    expect(productPicture.find('img').props().src).toEqual(expect.stringContaining(`${props.product.files[0]}_s`));
  });
});
