import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PriceCalculation from '../../common/priceCalculation';
import { formatPriceWithCurrency } from '../../common/priceFormatter';
import { createFinishOrder } from '../actions';
import { CouponPropType, ShoppingCartItemsPropType } from '../propTypes';
import theme, { accent1Color, brandSecondary } from '../theme';

const grey100 = grey['100'];
const grey600 = grey['600'];
const priceCalculation = PriceCalculation.create(ORDER.MIN_PRICE_SHIPPING, ORDER.SHIPPING_COST);

const SummaryContainer = styled.div`
  margin: 10px;
  overflow-x: auto;
`;

const TableBody = styled.tbody`
  tr:nth-child(2n) {
    background-color: ${grey100};
  }
  
  tr:last-of-type td {
    border-bottom: 1px solid ${grey600};
  }
`;

const Cell = styled.td`
  padding: 10px;
  
  @media screen and (min-width: ${theme.breakpoints.values.md}px) {
    padding: 15px;
  }
`;

const StyledAvatar = styled(Avatar)`
  display: inline-block !important;
  object-fit: cover;
  vertical-align: middle;
  margin-right: 10px;
  
  @media screen and (max-width: ${theme.breakpoints.values.md}px) {
    display: none !important;
  }
`;

const HeaderCell = Cell.withComponent('th');

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

const ProductLink = styled.a`
  color: ${brandSecondary};
  text-decoration: none;
  
  &:hover {
    color: ${accent1Color};
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
            <HeaderCell>
              <FormattedMessage id="COMMON.PRODUCT" />
            </HeaderCell>
            <HeaderCell>
              <FormattedMessage id="COMMON.QUANTITY" />
            </HeaderCell>
            <HeaderCell>
              <FormattedMessage id="COMMON.AMOUNT" />
            </HeaderCell>
          </tr>
        </thead>
        <TableBody>
          {items.map(item => (
            <tr key={item.product._id}>
              <Cell>
                <StyledAvatar
                  src={(item.product.files.length)
                    ? `/api/products/pictures/${item.product.files[0]}_s`
                    : '/assets/images/notFound.jpg'
                  }
                />
                <ProductLink href={`/products/${item.product._id}`} target="_blank">
                  {item.product.de.name}
                </ProductLink>
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
            <FooterTitleCell>
              <FormattedMessage id="COMMON.SUBTOTAL" />
            </FooterTitleCell>
            <Cell />
            <Cell>
              {formatPriceWithCurrency(itemTotal)}
            </Cell>
          </tr>
          {priceCalculation.isInShippingCostRange(itemTotal) && (
            <tr>
              <Cell>
                <FormattedMessage id="COMMON.SHIPPING_COSTS" />
              </Cell>
              <AmountCell>
                +
              </AmountCell>
              <Cell>
                {formatPriceWithCurrency(ORDER.SHIPPING_COST)}
              </Cell>
            </tr>
          )}
          {coupons.length ? (
            <tr>
              <Cell>
                <FormattedMessage id="COMMON.COUPONS" />
              </Cell>
              <AmountCell>
                -
              </AmountCell>
              <Cell>
                {formatPriceWithCurrency(priceCalculation.calculateCouponsTotal(coupons))}
              </Cell>
            </tr>
          ) : null}
          <GrandTotalRow>
            <FooterTitleCell>
              <FormattedMessage id="ORDERS.TOTAL" />
            </FooterTitleCell>
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
    <Button
      variant="contained"
      key="finishOrderButton"
      color="primary"
      onClick={() => finishOrder(orderId)}
    >
      <FormattedMessage id="ORDER.SUMMARY.CONFIRM_ORDER" />
    </Button>,
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
