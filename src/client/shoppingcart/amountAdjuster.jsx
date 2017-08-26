import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import { ShoppingCartItemPropType } from '../propTypes';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: '8px 0 0',
  },
};

const AmountIncreaser = ({
  shoppingCartItem: {
    amount,
    product,
  },
  setAmount,
}) => (
  <div style={styles.container}>
    <FlatButton secondary icon={<ContentRemove />} onClick={() => setAmount(amount - 1, product)} />
    {amount}
    <FlatButton primary icon={<ContentAdd />} onClick={() => setAmount(amount + 1, product)} />
  </div>
);

AmountIncreaser.propTypes = {
  shoppingCartItem: ShoppingCartItemPropType.isRequired,
  setAmount: PropTypes.func.isRequired,
};

export default AmountIncreaser;
