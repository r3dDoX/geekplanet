import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
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
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>
                {order.state}
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
