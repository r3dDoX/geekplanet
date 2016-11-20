import React from 'react';

const svgPath = 'M14,5.5c-0.3-0.8-0.8-1.5-1.4-2.1C12,2.8,11.3,2.4,10.5,2C9.7,1.7,8.9,1.5,8,1.5S6.3,1.7,5.5,2C4.7,2.4,4,2.8,3.4,3.4C2.8,4,2.3,4.7,2,5.5C1.7,6.3,1.5,7.1,1.5,8c0,0.9,0.2,1.7,0.5,2.5c0.3,0.8,0.8,1.5,1.4,2.1C4,13.2,4.7,13.7,5.5,14c0.8,0.3,1.6,0.5,2.5,0.5s1.7-0.2,2.5-0.5c0.8-0.3,1.5-0.8,2.1-1.4c0.6-0.6,1.1-1.3,1.4-2.1c0.3-0.8,0.5-1.6,0.5-2.5C14.5,7.1,14.3,6.3,14,5.5z M6.8,11.4L3.5,8.1L4.7,7l2.1,2.1l4.5-4.5l1.2,1.2L6.8,11.4z';

export default () => (
  <div className="product-tile">
    <svg
      aria-hidden="true"
      className="product-tile__availability"
      height="16"
      role="img"
      width="16"
    >
      <symbol id="geekplanet" viewBox="0 0 16 16">
        <path d={svgPath} />
      </symbol>
      <use xmlns="http://www.w3.org/1999/xlink" xmlnsXlink="#geekplanet" />
    </svg>
    <img alt="Product" className="product-tile__image" src="assets/images/lemanRuss.png" />
    <h2 className="product-tile__title">Lorem Ipsum</h2>
    <p className="product-tile__description">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
      accusam et justo duo dolores
    </p>
  </div>
);
