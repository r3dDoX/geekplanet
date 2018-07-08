import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import TextField from '@material-ui/core/TextField';
import propTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { formatPriceWithCurrency } from '../../../common/priceFormatter';
import { CouponPropType } from '../../propTypes';
import { createCoupon, createLoadCoupons } from '../adminActions';

const grey200 = grey['200'];

const Container = styled.div`
  padding: 20px;
`;

const CreateButton = styled(Button)`
  margin-left: 20px !important;
`;

const CouponTable = styled.table`
  margin-top: 20px;
  
  tbody tr:nth-child(2n - 1) {
    background-color: ${grey200};
  }
  
  td {
    padding: 10px;
  }
`;

class Coupons extends React.Component {
  componentWillMount() {
    if (!this.props.coupons.length) {
      this.props.loadCoupons();
    }
  }

  createCoupon() {
    this.props.createNewCoupon(this.couponInput.value);
    this.couponInput.value = '';
  }

  render() {
    const { coupons } = this.props;
    return (
      <Container>
        <TextField
          inputRef={(couponInput) => { this.couponInput = couponInput; }}
          label={<FormattedMessage id="COUPONS.AMOUNT" />}
          type="number"
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              this.createCoupon();
            }
          }}
        />
        <CreateButton
          variant="contained"
          color="primary"
          onClick={() => this.createCoupon()}
        >
          <FormattedMessage id="COUPONS.CREATE" />
        </CreateButton>
        <br />
        <CouponTable cellPadding="0" cellSpacing="1px">
          <thead>
            <tr>
              <th>
Code
              </th>
              <th>
                <FormattedMessage id="COUPONS.AMOUNT" />
              </th>
              <th>
                <FormattedMessage id="COUPONS.CREATED" />
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(coupon => (
              <tr key={coupon._id}>
                <td>
                  {coupon._id}
                </td>
                <td>
                  {formatPriceWithCurrency(coupon.amount)}
                </td>
                <td>
                  {(() => {
                    const date = new Date(coupon.date);
                    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </CouponTable>
      </Container>
    );
  }
}

Coupons.propTypes = {
  coupons: CouponPropType.isRequired,
  loadCoupons: propTypes.func.isRequired,
  createNewCoupon: propTypes.func.isRequired,
};

export default connect(
  state => ({
    coupons: state.admin.coupons,
  }),
  dispatch => ({
    loadCoupons() {
      dispatch(createLoadCoupons());
    },
    createNewCoupon(amount) {
      dispatch(createCoupon(amount));
    },
  })
)(Coupons);
