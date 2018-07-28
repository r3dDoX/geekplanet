import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import InStockIcon from '@material-ui/icons/Done';
import OutOfStockIcon from '@material-ui/icons/LocalShipping';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const green500 = green['500'];
const grey700 = grey['700'];

const StyledInStockIcon = styled(InStockIcon)`
  flex: none;
`;

const StyledOutOfStockIcon = styled(OutOfStockIcon)`
  flex: none;
  transform: rotateY(180deg);
`;

const StockIcon = ({ stock }) => {
  if (stock > 0) {
    return <StyledInStockIcon nativeColor={green500} />;
  }

  return (
    <StyledOutOfStockIcon
      nativeColor={grey700}
    />
  );
};

StockIcon.propTypes = {
  stock: PropTypes.number.isRequired,
};

export default StockIcon;
