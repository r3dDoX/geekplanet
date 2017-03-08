import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import shortId from 'shortid';
import { FormattedMessage } from 'react-intl';
import ShoppingCartPropType from '../shoppingcart/shoppingCart.proptypes';
import secretConfig from '../../config/secret.config.json';

const styles = {
  button: {
    marginTop: '15px',
  },
};

const LightboxOpener = ({ shoppingCart }, { datatrans: { openPaymentLayer } }) => (
  <RaisedButton
    style={styles.button}
    label={<FormattedMessage id="ORDER.PAYMENT.SELECT_PAYMENT_METHOD" />}
    primary
    onClick={
      () => openPaymentLayer({
        amount: shoppingCart.reduce(
          (sum, { amount, product }) => sum + (product.price * amount),
          0) * 100,
        currency: 'CHF',
        sign: process.env.SIGN || secretConfig.SIGN,
        merchantId: process.env.MERCHANT_ID || secretConfig.MERCHANT_ID,
        refno: shortId.generate(),
      })
        .catch(e => window.console.error(e))
    }
  />
);

LightboxOpener.contextTypes = {
  datatrans: React.PropTypes.shape({
    openPaymentLayer: React.PropTypes.func,
  }),
};

LightboxOpener.propTypes = {
  shoppingCart: ShoppingCartPropType.isRequired,
};

export default connect(
  state => ({ shoppingCart: state.shoppingCart }),
  () => ({})
)(LightboxOpener);
