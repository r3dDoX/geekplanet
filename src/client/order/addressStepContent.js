import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import actions from 'redux-form/es/actions';
import { createLoadAddresses, createSaveAddress, createSelectAddress } from '../actions';
import { OrderStatePropType } from '../propTypes';
import AddressChooser from './addressChooser';
import UserAddress, { formName } from './userAddress';

const { initialize } = actions;

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

    return [
      <AddressChooser
        key="addressChooserSelectBox"
        addresses={order.addresses}
        selectedAddressId={order.selectedAddress && order.selectedAddress._id}
        selectAddress={
          addressId => selectAddress(
            order.addresses.find(address => address._id === addressId),
          )
        }
      />,
      <UserAddress key="addressForm" onSubmit={saveAddress} />,
    ];
  }
}

AddressStep.propTypes = {
  loadAddresses: PropTypes.func.isRequired,
  selectAddress: PropTypes.func.isRequired,
  saveAddress: PropTypes.func.isRequired,
  order: OrderStatePropType.isRequired,
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
