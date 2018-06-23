import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ContentAdd from '@material-ui/icons/Add';
import ContentRemove from '@material-ui/icons/Remove';
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
    <Button color="secondary" icon={<ContentRemove />} onClick={() => setAmount(amount - 1, product)} />
    {amount}
    <Button color="primary" icon={<ContentAdd />} onClick={() => setAmount(amount + 1, product)} />
  </div>
);

AmountIncreaser.propTypes = {
  shoppingCartItem: ShoppingCartItemPropType.isRequired,
  setAmount: PropTypes.func.isRequired,
};

export default AmountIncreaser;
