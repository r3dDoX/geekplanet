import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableFooter,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import ShoppingCartPropType from './shoppingCart.proptypes';

const styles = {
  container: {
    padding: '24px',
  },
  productAvatar: {
    margin: '10px 0',
  },
};

const ShoppingCart = ({
  shoppingCartItems,
}) => (
  <div style={styles.container}>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn />
          <TableHeaderColumn>Count</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Price</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shoppingCartItems.map(({ amount, product }) => (
          <TableRow key={product._id}>
            <TableRowColumn>
              <Avatar
                style={styles.productAvatar}
                size={60}
                src={`/api/products/pictures/${product.files[0]}`}
              />
            </TableRowColumn>
            <TableRowColumn>{amount}</TableRowColumn>
            <TableRowColumn>{product.name}</TableRowColumn>
            <TableRowColumn>{product.price * amount}</TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableRowColumn>Total</TableRowColumn>
          <TableRowColumn />
          <TableRowColumn />
          <TableRowColumn>
            {shoppingCartItems.reduce(
              (sum, { amount, product }) => sum + (amount * product.price), 0
            )}
          </TableRowColumn>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
);

ShoppingCart.propTypes = {
  shoppingCartItems: ShoppingCartPropType,
};

export default connect(
  state => ({
    shoppingCartItems: state.shoppingCart,
  }),
  dispatch => ({})
)(ShoppingCart);
