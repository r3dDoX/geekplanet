import React from 'react';
import { connect } from 'react-redux';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
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
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';
import ShoppingCartPropType from './shoppingCart.proptypes';
import formatPrice from '../products/priceFormatter';

const styles = {
  container: {
    padding: '24px',
  },
  productAvatar: {
    margin: '10px 0',
  },
  footerRow: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  amountCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const ShoppingCart = ({
  shoppingCartItems,
}) => (
  <div style={styles.container}>
    <Stepper
      activeStep={0}
      linear={false}
      orientation="vertical"
    >
      <Step>
        <StepButton>
          <FormattedMessage id="SHOPPING_CART.TITLE" />
        </StepButton>
        <StepContent>
          <Table multiSelectable>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn />
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Count</TableHeaderColumn>
                <TableHeaderColumn>Price</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover>
              {shoppingCartItems.map(({ amount, product }) => (
                <TableRow key={product._id}>
                  <TableRowColumn>
                    <Avatar
                      style={styles.productAvatar}
                      size={60}
                      src={`/api/products/pictures/${product.files[0]}`}
                    />
                  </TableRowColumn>
                  <TableRowColumn>{product.name}</TableRowColumn>
                  <TableRowColumn>
                    <div style={styles.amountCell}>
                      <FloatingActionButton mini>
                        <ContentAdd />
                      </FloatingActionButton>
                      {amount}
                      <FloatingActionButton mini secondary>
                        <ContentRemove />
                      </FloatingActionButton>
                    </div>
                  </TableRowColumn>
                  <TableRowColumn>{formatPrice(product.price * amount)}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow style={styles.footerRow}>
                <TableRowColumn colSpan="3" style={{ textAlign: 'right', }}>Total</TableRowColumn>
                <TableRowColumn>
                  {formatPrice(shoppingCartItems.reduce(
                    (sum, { amount, product }) => sum + (amount * product.price), 0
                  ))}
                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
          <div style={styles.buttonRow}>
            <RaisedButton
              onClick={() => console.log('do something')}
              label={<FormattedMessage id="COMMON.DELETE" />}
              secondary
            />
            <RaisedButton
              onClick={() => console.log('do something')}
              label={<FormattedMessage id="SHOPPING_CART.CHECKOUT" />}
              primary
            />
          </div>
        </StepContent>
      </Step>
      <Step>
        <StepButton>
          <FormattedMessage id="SHOPPING_CART.ADDRESS" />
        </StepButton>
        <StepContent>
          <p>An ad group contains one or more ads which target a shared set of keywords.</p>
        </StepContent>
      </Step>
    </Stepper>
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
