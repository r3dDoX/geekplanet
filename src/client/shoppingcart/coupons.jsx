import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import ContentRemove from '@material-ui/icons/Remove';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { formatPriceWithoutCurrency } from '../../common/priceFormatter';
import { CouponPropType } from '../propTypes';
import AddCoupon from './addCoupon.jsx';

const CouponPrice = styled.span`
  padding: 0 12px;
`;

const styles = () => ({
  listItemContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButtonRoot: {
    margin: '0 0 0 -12px',
  },
});

const Coupons = ({ classes, coupons, onAdd, onRemove }) => [
  <Divider key="couponsDivider" />,
  <ListSubheader key="couponsHeader" inset>
    <FormattedMessage id="COUPONS.TITLE" />
  </ListSubheader>,
  coupons.map(coupon => (
    <ListItem
      key={coupon._id}
      classes={{
        container: classes.listItemContainer,
      }}
    >
      <ListItemIcon>
        <IconButton
          classes={{ root: classes.iconButtonRoot }}
          onClick={() => onRemove(coupon._id)}
        >
          <ContentRemove color="secondary" />
        </IconButton>
      </ListItemIcon>
      <ListItemText primary={coupon._id} />
      <ListItemSecondaryAction>
        <CouponPrice>
          {`- ${formatPriceWithoutCurrency(coupon.amount)}`}
        </CouponPrice>
      </ListItemSecondaryAction>
    </ListItem>
  )),
  <AddCoupon key="couponAddForm" onAdd={onAdd} />,
];

Coupons.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  coupons: PropTypes.arrayOf(CouponPropType).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default withStyles(styles)(Coupons);
