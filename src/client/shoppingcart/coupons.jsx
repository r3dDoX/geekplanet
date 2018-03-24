import { Divider, Subheader } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CouponPropType } from '../propTypes';
import AddCoupon from './addCoupon.jsx';


const Coupons = ({ onAdd }) => [
  <Divider key="couponsDivider" />,
  <Subheader key="couponsHeader" inset>
    <FormattedMessage id="COUPONS.TITLE" />
  </Subheader>,
  <AddCoupon key="couponAddForm" onAdd={onAdd} />,
];

Coupons.propTypes = {
  coupons: PropTypes.arrayOf(CouponPropType).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default Coupons;
