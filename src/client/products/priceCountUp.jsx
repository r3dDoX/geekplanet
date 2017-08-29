import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

const PriceCountUp = ({ price }) => (
  <CountUp
    start={0}
    end={price}
    decimals={2}
    prefix="CHF "
    duration={2}
  />
);

PriceCountUp.propTypes = {
  price: PropTypes.number.isRequired,
};

export default PriceCountUp;
