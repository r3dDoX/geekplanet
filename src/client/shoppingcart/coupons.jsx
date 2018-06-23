import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatPriceWithoutCurrency } from '../../common/priceFormatter';
import { CouponPropType } from '../propTypes';
import AddCoupon from './addCoupon.jsx';

const Coupons = ({ coupons, onAdd, onRemove }) => [
  <Divider key="couponsDivider" />,
  <ListSubheader key="couponsHeader" inset>
    <FormattedMessage id="COUPONS.TITLE" />
  </ListSubheader>,
  coupons.map(coupon => (
    <MenuItem
      key={coupon._id}
      insetChildren
      primaryText={coupon._id}
      secondaryText={`- ${formatPriceWithoutCurrency(coupon.amount)}`}
      leftIcon={<ClearIcon />}
      onClick={() => onRemove(coupon._id)}
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
