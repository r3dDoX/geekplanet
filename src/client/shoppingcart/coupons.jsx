import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatPriceWithoutCurrency } from '../../common/priceFormatter';
import { CouponPropType } from '../propTypes';
import AddCoupon from './addCoupon.jsx';


const Coupons = ({ coupons, onAdd }) => [
  <Divider key="couponsDivider" />,
  <Subheader key="couponsHeader" inset>
    <FormattedMessage id="COUPONS.TITLE" />
  </Subheader>,
  coupons.map(coupon => (
    <MenuItem
      insetChildren primaryText={coupon._id}
      secondaryText={`- ${formatPriceWithoutCurrency(coupon.amount)}`}
    />
  )),
  <AddCoupon key="couponAddForm" onAdd={onAdd} />,
];

Coupons.propTypes = {
  coupons: PropTypes.arrayOf(CouponPropType).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default Coupons;
