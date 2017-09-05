import RaisedButton from 'material-ui/RaisedButton';
import { grey200 } from 'material-ui/styles/colors';
import DoneIcon from 'material-ui/svg-icons/action/done';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { formatPriceWithCurrency } from '../../../common/priceFormatter';
import { OrdersPropType } from '../../propTypes';
import { createClearPayment, createLoadOrders } from '../adminActions';
import { WAITING } from '../../../common/orderState';

const Container = styled.div`
  overflow-X: auto;
`;

const OrderTable = styled.table`
  width: 100%;
  padding: 20px;
  
  tbody tr:nth-child(2n - 1) {
    background-color: ${grey200};
    
  }
  
  td {
    padding: 5px;
  }
`;

const CenteredCell = styled.td`
  text-align: center;
`;

class Orders extends React.Component {
  componentWillMount() {
    if (!this.props.orders.length) {
      this.props.loadOrders();
    }
  }

  render() {
    const { orders, clearPayment } = this.props;

    return (
      <Container>
        <OrderTable cellPadding="0" cellSpacing="1px">
          <thead>
            <tr>
              <th>
                <FormattedMessage id="ORDERS.ID" />
              </th>
              <th>
                <FormattedMessage id="ORDERS.STATUS" />
              </th>
              <th>
                <FormattedMessage id="ORDERS.ADDRESS" />
              </th>
              <th>
                <FormattedMessage id="ORDERS.ITEMS" />
              </th>
              <th>
                <FormattedMessage id="ORDERS.TOTAL" />
              </th>
              <th>
                <EditIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>
                  {order._id}
                </td>
                <td>
                  {order.state}
                </td>
                <td>
                  {`${order.address.title} ${order.address.firstName} ${order.address.lastName}`}<br />
                  {order.address.streetAddress}<br />
                  {`${order.address.zip} ${order.address.city}`}<br />
                  {order.address.country}
                </td>
                <td>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.product._id}>
                        {`${item.amount} * ${item.product.de.name}`}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  {formatPriceWithCurrency(order.items.reduce(
                    (sum, { amount, product }) => sum + (amount * product.price),
                    0
                  ))}
                </td>
                <CenteredCell>
                  {order.state === WAITING ? (
                    <RaisedButton
                      primary
                      icon={<DoneIcon />}
                      onClick={() => clearPayment(order._id)}
                    />
                  ) : (
                    <ThumbUpIcon />
                  )}
                </CenteredCell>
              </tr>
            ))}
          </tbody>
        </OrderTable>
      </Container>
    );
  }
}

Orders.propTypes = {
  orders: OrdersPropType.isRequired,
  loadOrders: PropTypes.func.isRequired,
  clearPayment: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    orders: state.admin.orders,
  }),
  dispatch => ({
    loadOrders() {
      dispatch(createLoadOrders());
    },
    clearPayment(orderId) {
      dispatch(createClearPayment(orderId));
    },
  })
)(Orders);
