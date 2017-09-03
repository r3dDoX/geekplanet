import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

const PriceCountUp = ({ price }) => (
  <CountUp
    start={price * 2}
    end={price}
    decimals={2}
    prefix="CHF "
    duration={1.75}
  />
);

PriceCountUp.propTypes = {
  price: PropTypes.number.isRequired,
};

export default PriceCountUp;
