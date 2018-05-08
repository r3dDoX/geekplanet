import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import { grey300, grey600 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PriceCalculation from '../../common/priceCalculation';
import { formatPriceWithCurrency } from '../../common/priceFormatter';
import { createFinishOrder } from '../actions';
import { CouponPropType, ShoppingCartItemsPropType } from '../propTypes';
import { accent1Color, brandSecondary, xsMaxSize } from '../theme';

const priceCalculation = PriceCalculation.create(ORDER.MIN_PRICE_SHIPPING, ORDER.SHIPPING_COST);

const SummaryContainer = styled.div`
  margin: 20px 0;
  overflow-x: auto;
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
  
  @media screen and (min-width: ${xsMaxSize}) {
    padding: 15px;
  }
`;

const StyledAvatar = styled(Avatar)`
  object-fit: cover;
  vertical-align: middle;
  margin-right: 10px;
  
  @media screen and (max-width: ${xsMaxSize}) {
    display: none !important;
  }
`;

const HeaderCell = Cell.withComponent('th');

const AmountCell = Cell.extend`
  text-align: center;
`;

const FooterTitleCell = Cell.extend`
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
                  src={(item.product.files.length) ?
                    `/api/products/pictures/${item.product.files[0]}_s` : '/assets/images/notFound.jpg'
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
              <AmountCell>+</AmountCell>
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
              <AmountCell>-</AmountCell>
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
