import RaisedButton from 'material-ui/RaisedButton';
import { grey300, grey600 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { formatPriceWithCurrency } from '../../common/priceFormatter';
import { createFinishOrder } from '../actions';
import { CouponPropType, ShoppingCartItemsPropType } from '../propTypes';
import PriceCalculation from '../../common/priceCalculation';

const priceCalculation = PriceCalculation.create(ORDER.MIN_PRICE_SHIPPING, ORDER.SHIPPING_COST);

const SummaryContainer = styled.div`
  margin: 20px 0;
`;

const HeaderCell = styled.th`
  padding: 10px;
`;

const TableBody = styled.tbody`
  tr:nth-child(2n) {
    background-color: ${grey300};
  }
  
  tr:last-of-type td {
    border-bottom: 1px solid ${grey600};
  }
`;

const Cell = styled.td`
  padding: 10px;
`;

const AmountCell = styled(Cell)`
  text-align: center;
`;

const FooterTitleCell = styled(Cell)`
  font-weight: bold;
`;

const GrandTotalRow = styled.tr`
  td {
    border-top: 1px solid ${grey600};
  }
`;

const Summary = ({
  orderId,
  items,
  coupons,
  finishOrder,
}) => {
  const itemTotal = priceCalculation.calculateItemTotal(items);

  return [
    <SummaryContainer key="orderSummary">
      <table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <HeaderCell>Product</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Price</HeaderCell>
          </tr>
        </thead>
        <TableBody>
          {items.map(item => (
            <tr key={item.product._id}>
              <Cell>
                {item.product.de.name}
              </Cell>
              <AmountCell>
                {item.amount}
              </AmountCell>
              <Cell>
                {formatPriceWithCurrency(item.amount * item.product.price)}
              </Cell>
            </tr>
          ))}
        </TableBody>
        <tfoot>
          <tr>
            <FooterTitleCell>Zwischentotal</FooterTitleCell>
            <Cell />
            <Cell>
              {formatPriceWithCurrency(itemTotal)}
            </Cell>
          </tr>
          {priceCalculation.isInShippingCostRange(itemTotal)
            ? (
              <tr>
                <Cell>Versandkosten</Cell>
                <AmountCell>+</AmountCell>
                <Cell>
                  {formatPriceWithCurrency(ORDER.SHIPPING_COST)}
                </Cell>
              </tr>
            )
            : null
          }
          {coupons.length
            ? (
              <tr>
                <Cell>Gutscheine</Cell>
                <AmountCell>-</AmountCell>
                <Cell>
                  {formatPriceWithCurrency(priceCalculation.calculateCouponsTotal(coupons))}
                </Cell>
              </tr>
            )
            : null
          }
          <GrandTotalRow>
            <FooterTitleCell>Total</FooterTitleCell>
            <Cell />
            <Cell>
              {formatPriceWithCurrency(
                priceCalculation.calculateGrandTotal(
                  itemTotal,
                  coupons
                )
              )}
            </Cell>
          </GrandTotalRow>
        </tfoot>
      </table>
    </SummaryContainer>,
    <RaisedButton
      key="finishOrderButton"
      label={<FormattedMessage id="ORDER.SUMMARY.CONFIRM_ORDER" />}
      primary
      onClick={() => finishOrder(orderId)}
    />,
  ];
};

Summary.propTypes = {
  finishOrder: PropTypes.func.isRequired,
  items: ShoppingCartItemsPropType.isRequired,
  coupons: PropTypes.arrayOf(CouponPropType).isRequired,
  orderId: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    items: state.shoppingCart.items,
    coupons: state.shoppingCart.coupons,
    orderId: state.shoppingCart.id,
  }),
  dispatch => ({
    finishOrder(orderId) {
      dispatch(createFinishOrder(orderId));
    },
  }),
)(Summary);
