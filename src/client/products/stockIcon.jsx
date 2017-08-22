import { green500, grey700 } from 'material-ui/styles/colors';
import InStockIcon from 'material-ui/svg-icons/action/done';
import OutOfStockIcon from 'material-ui/svg-icons/maps/local-shipping';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledInStockIcon = styled(InStockIcon)`
  flex: none;
`;

const StyledOutOfStockIcon = styled(OutOfStockIcon)`
  flex: none;
  transform: rotateY(180deg);
`;

const StockIcon = ({ stock }) => {
  if (stock > 0) {
    return <StyledInStockIcon color={green500} />;
  }

  return (
    <StyledOutOfStockIcon
      color={grey700}
    />
  );
};

StockIcon.propTypes = {
  stock: PropTypes.number.isRequired,
};

export default StockIcon;
