import { grey200 } from 'material-ui/styles/colors';
import propTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { formatPriceWithCurrency } from '../../../common/priceFormatter';
import { CouponPropType } from '../../propTypes';
import { createLoadCoupons } from '../adminActions';

const Container = styled.div`
  padding: 20px;
`;

const CouponTable = styled.table`
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
    const { coupons } = this.props;
    return (
      <Container>
        <CouponTable cellPadding="0" cellSpacing="1px">
          <thead>
            <tr>
              <th>Code</th>
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
                <td>{coupon._id}</td>
                <td>{formatPriceWithCurrency(coupon.amount)}</td>
                <td>{new Date(coupon.date).toLocaleDateString()}</td>
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
};

export default connect(
  state => ({
    coupons: state.admin.coupons,
  }),
  dispatch => ({
    loadCoupons() {
      dispatch(createLoadCoupons());
    },
  })
)(Coupons);
