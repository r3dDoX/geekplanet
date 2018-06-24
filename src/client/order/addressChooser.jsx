import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { UserAddressesPropType } from '../propTypes';

const AddressChooser = ({
  addresses,
  selectAddress,
  selectedAddressId,
}) => (
  <Select
    autoWidth
    label={<FormattedMessage id="ORDER.ADDRESS.FORM.NO_ADDRESS" />}
    onChange={(event, index, value) => selectAddress(value)}
    value={selectedAddressId}
  >
    <MenuItem value="">
      <FormattedMessage id="ORDER.ADDRESS.FORM.NO_ADDRESS" />
    </MenuItem>
    <Divider />
    {addresses.map(({ _id, streetAddress }) => (
      <MenuItem
        key={_id}
        value={_id}
      >
        {streetAddress}
      </MenuItem>
    ))}
  </Select>
);

AddressChooser.defaultProps = {
  selectedAddressId: '',
};

AddressChooser.propTypes = {
  selectedAddressId: PropTypes.string,
  addresses: UserAddressesPropType.isRequired,
  selectAddress: PropTypes.func.isRequired,
};

export default AddressChooser;
