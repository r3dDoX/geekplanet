import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import AddressChooser from './addressChooser.jsx';
import UserAddress, { formName } from './userAddress.jsx';
import {
  createLoadAddresses,
  createSaveAddress,
  createSelectAddress,
} from '../actions';
import { OrderPropType } from '../propTypes';

class AddressStep extends React.Component {
  componentWillMount() {
    this.props.loadAddresses();
  }

  render() {
    const {
      selectAddress,
      saveAddress,
      order,
    } = this.props;

    return (
      <div>
        <AddressChooser
          addresses={order.addresses}
          selectedAddressId={order.selectedAddress && order.selectedAddress._id}
          selectAddress={
            addressId => selectAddress(
              order.addresses.find(address => address._id === addressId),
            )
          }
        />
        <UserAddress onSubmit={saveAddress} />
      </div>
    );
  }
}

AddressStep.propTypes = {
  loadAddresses: PropTypes.func.isRequired,
  selectAddress: PropTypes.func.isRequired,
  saveAddress: PropTypes.func.isRequired,
  order: OrderPropType.isRequired,
};

export default connect(
  state => ({
    order: state.order,
  }),
  dispatch => ({
    loadAddresses() {
      dispatch(createLoadAddresses());
    },
    selectAddress: (address) => {
      dispatch(createSelectAddress(address));
      dispatch(initialize(formName, address));
    },
    saveAddress(address) {
      dispatch(createSaveAddress(address));
    },
  }),
)(AddressStep);
