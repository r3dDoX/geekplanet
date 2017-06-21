import React from 'react';
import PropTypes from 'prop-types';
import InStockIcon from 'material-ui/svg-icons/action/done';
import OutOfStockIcon from 'material-ui/svg-icons/maps/local-shipping';
import { green500, grey700 } from 'material-ui/styles/colors';

const styles = {
  stockIcon: {
    flex: 'none',
  },
  outOfStock: {
    transform: 'rotateY(180deg)',
  },
};

const StockIcon = ({ stock }) => {
  if (stock > 0) {
    return <InStockIcon style={styles.stockIcon} color={green500} />;
  }

  return (
    <OutOfStockIcon
      style={Object.assign({}, styles.stockIcon, styles.outOfStock)}
      color={grey700}
    />
  );
};

StockIcon.propTypes = {
  stock: PropTypes.number.isRequired,
};

export default StockIcon;
