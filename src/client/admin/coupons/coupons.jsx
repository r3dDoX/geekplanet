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
  margin-left: 20px;
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

  render() {
    const { coupons, createNewCoupon } = this.props;
    return (
      <Container>
        <TextField
          ref={(couponInput) => { this.couponInput = couponInput; }}
          hintText={<FormattedMessage id="COUPONS.AMOUNT" />}
          type="number"
        />
        <CreateButton
          variant="contained"
          color="primary"
          label={<FormattedMessage id="COUPONS.CREATE" />}
          onClick={() => {
            createNewCoupon(this.couponInput.input.value);
            this.couponInput.input.value = '';
          }}
        />
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
