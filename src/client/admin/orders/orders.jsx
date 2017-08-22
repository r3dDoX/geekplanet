import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { formatPriceWithCurrency } from '../../../common/priceFormatter';
import { OrdersPropType } from '../../propTypes';
import { createLoadOrders } from '../adminActions';

class Orders extends React.Component {
  componentWillMount() {
    if (!this.props.orders.length) {
      this.props.loadOrders();
    }
  }

  render() {
    const { orders } = this.props;

    return (
      <table>
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
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Orders.propTypes = {
  orders: OrdersPropType.isRequired,
  loadOrders: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    orders: state.admin.orders,
  }),
  dispatch => ({
    loadOrders() {
      dispatch(createLoadOrders());
    },
  })
)(Orders);
