import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatPriceWithoutCurrency } from '../../common/priceFormatter';
import { CouponPropType } from '../propTypes';
import AddCoupon from './addCoupon.jsx';

const Coupons = ({ coupons, onAdd, onRemove }) => [
  <Divider key="couponsDivider" />,
  <Subheader key="couponsHeader" inset>
    <FormattedMessage id="COUPONS.TITLE" />
  </Subheader>,
  coupons.map(coupon => (
    <MenuItem
      insetChildren
      primaryText={coupon._id}
      secondaryText={`- ${formatPriceWithoutCurrency(coupon.amount)}`}
      leftIcon={<ClearIcon onClick={() => onRemove(coupon._id)} />}
    />
  )),
  <AddCoupon key="couponAddForm" onAdd={onAdd} />,
];

Coupons.propTypes = {
  coupons: PropTypes.arrayOf(CouponPropType).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Coupons;
