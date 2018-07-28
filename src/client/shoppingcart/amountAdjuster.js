import IconButton from '@material-ui/core/IconButton';
import ContentAdd from '@material-ui/icons/Add';
import ContentRemove from '@material-ui/icons/Remove';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { ShoppingCartItemPropType } from '../propTypes';

const Container = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 8px 0 0;
`;

const AmountAdjuster = ({
  shoppingCartItem: {
    amount,
    product,
  },
  setAmount,
}) => (
  <Container>
    <IconButton color="secondary" onClick={() => setAmount(amount - 1, product)}>
      <ContentRemove />
    </IconButton>
    {amount}
    <IconButton color="primary" onClick={() => setAmount(amount + 1, product)}>
      <ContentAdd />
    </IconButton>
  </Container>
);

AmountAdjuster.propTypes = {
  shoppingCartItem: ShoppingCartItemPropType.isRequired,
  setAmount: PropTypes.func.isRequired,
};

export default AmountAdjuster;
