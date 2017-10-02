import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { grey200 } from 'material-ui/styles/colors';
import DoneIcon from 'material-ui/svg-icons/action/done';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ViewIcon from 'material-ui/svg-icons/action/visibility';
import CreditCardIcon from 'material-ui/svg-icons/action/credit-card';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { WAITING } from '../../../common/orderState';
import { formatPriceWithCurrency } from '../../../common/priceFormatter';
import { OrdersPropType } from '../../propTypes';
import { createClearPayment, createLoadOrders } from '../adminActions';

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

const BreakingCell = styled.td`
  word-break: break-all;
`;

const StyledViewIcon = styled(ViewIcon)`
  width: 16px !important;
  height: 16px !important;
  cursor: pointer;
  margin-left: 5px;
`;

const ItemList = styled.ul`
  list-style: none;
  
  li:nth-child(2n - 1) {
    background-color: ${grey200};
    
  }
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const ItemAvatar = styled(Avatar)`
  margin-right: 15px;
  object-fit: cover;
`;

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentWillMount() {
    if (!this.props.orders.length) {
      this.props.loadOrders();
    }
  }

  handleOpen(id) {
    this.setState({
      open: id,
    });
    return false;
  }

  handleClose() {
    this.setState({
      open: false,
    });
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
                <FormattedMessage id="ORDERS.ESR" />
              </th>
              <th>
                <FormattedMessage id="ORDERS.ADDRESS" />
              </th>
              <th>
                <FormattedMessage id="ORDERS.STATUS" />
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
                  <StyledViewIcon onClick={() => this.handleOpen(order._id)} role="button" />
                  <Dialog
                    open={this.state.open === order._id}
                    onRequestClose={() => this.handleClose()}
                    actions={
                      <FlatButton
                        label="Ok"
                        primary
                        onClick={() => this.handleClose()}
                      />
                    }
                  >
                    <ItemList>
                      {order.items.map(item => (
                        <Item key={item.product._id}>
                          <ItemAvatar
                            size={64}
                            src={(item.product.files.length) ?
                              `/api/products/pictures/${item.product.files[0]}_s` : '/assets/images/notFound.jpg'
                            }
                          />
                          {item.amount}&nbsp;*&nbsp;
                          <Link to={`/products/${item.product._id}`}>
                            {item.product.de.name}
                          </Link>
                        </Item>
                      ))}
                    </ItemList>
                  </Dialog>
                </td>
                <BreakingCell>
                  {order.esr ? order.esr : <CreditCardIcon />}
                </BreakingCell>
                <td>
                  {`${order.address.title} ${order.address.firstName} ${order.address.lastName}`}<br />
                  {order.address.streetAddress}<br />
                  {`${order.address.zip} ${order.address.city}`}<br />
                  {order.address.country}
                </td>
                <td>
                  {order.state}
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
