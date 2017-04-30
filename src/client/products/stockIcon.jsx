import React from 'react';
import PropTypes from 'prop-types';
import InStockIcon from 'material-ui/svg-icons/toggle/check-box';
import OutOfStockIcon from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import { green500, grey700 } from 'material-ui/styles/colors';

const styles = {
  stockIcon: {
    flex: 'none',
  },
};

const StockIcon = ({ stock }) => {
  if (stock > 0) {
    return <InStockIcon style={styles.stockIcon} color={green500} />;
  }

  return <OutOfStockIcon style={styles.stockIcon} color={grey700} />;
};

StockIcon.propTypes = {
  stock: PropTypes.number.isRequired,
};

export default StockIcon;
