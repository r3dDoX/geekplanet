import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DoneIcon from '@material-ui/icons/Done';
import ShippedIcon from '@material-ui/icons/LocalShipping';
import EditIcon from '@material-ui/icons/Edit';
import AttentionIcon from '@material-ui/icons/Report';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ViewIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FINISHED, SENT, WAITING } from '../../../common/orderState';
import PriceCalculation from '../../../common/priceCalculation';
import { formatPriceWithCurrency } from '../../../common/priceFormatter';
import { OrdersPropType } from '../../propTypes';
import { createClearPayment, createLoadOrders, createOrderSent } from '../adminActions';

const grey200 = grey['200'];
const priceCalculation = PriceCalculation.create(ORDER.MIN_PRICE_SHIPPING, ORDER.SHIPPING_COST);

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
  padding: 0;
  
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

  renderOrderButton(id, state) {
    switch (state) {
      case WAITING:
        return (
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.props.clearPayment(id)}
          >
            <DoneIcon />
          </Button>
        );
      case FINISHED:
        return (
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.props.orderSent(id)}
          >
            <ShippedIcon />
          </Button>
        );
      case SENT:
        return (
          <ThumbUpIcon />
        );
      default:
        return <AttentionIcon />;
    }
  }

  render() {
    const { orders } = this.props;

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
                    keepMounted
                    open={this.state.open === order._id}
                    onClose={() => this.handleClose()}
                  >
                    <DialogContent>
                      <DialogContentText component="div">
                        <ItemList>
                          {order.items.map(item => (
                            <Item key={item.product._id}>
                              <ItemAvatar
                                size={64}
                                src={(item.product.files.length)
                                  ? `/api/products/pictures/${item.product.files[0]}_s`
                                  : '/assets/images/notFound.jpg'
                                }
                              />
                              {item.amount}
                              &nbsp;*&nbsp;
                              <Link to={`/products/${item.product._id}`}>
                                {item.product.de.name}
                              </Link>
                            </Item>
                          ))}
                        </ItemList>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => this.handleClose()}>
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                </td>
                <BreakingCell>
                  {order.esr
                    ? order.esr
                    : <CreditCardIcon />
                  }
                </BreakingCell>
                <td>
                  {`${order.address.title} ${order.address.firstName} ${order.address.lastName}`}
                  <br />
                  {order.address.streetAddress}
                  <br />
                  {`${order.address.zip} ${order.address.city}`}
                  <br />
                  {order.address.country}
                </td>
                <td>
                  {order.state}
                </td>
                <td>
                  {formatPriceWithCurrency(priceCalculation.calculateGrandTotal(
                    priceCalculation.calculateItemTotal(order.items),
                    order.coupons
                  ))}
                </td>
                <CenteredCell>
                  {this.renderOrderButton(order._id, order.state)}
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
  orderSent: PropTypes.func.isRequired,
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
    orderSent(orderId) {
      dispatch(createOrderSent(orderId));
    },
  })
)(Orders);
