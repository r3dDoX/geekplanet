import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { UserAddressesPropType } from './order.proptypes';

const AddressChooser = ({
  addresses,
  selectAddress,
  selectedAddressId,
}) => (
  <SelectField
    autoWidth
    floatingLabelText={<FormattedMessage id="ORDER.ADDRESS.FORM.NO_ADDRESS" />}
    onChange={(event, index, value) => selectAddress(value)}
    value={selectedAddressId}
  >
    <MenuItem
      value=""
      primaryText={<FormattedMessage id="ORDER.ADDRESS.FORM.NO_ADDRESS" />}
    />
    <Divider />
    <MenuItem primaryText={<FormattedMessage id="ORDER.ADDRESS.FORM.RECENTLY" />} disabled />
    {addresses.map(({ _id, streetName, streetNumber }) => <MenuItem
      key={_id}
      value={_id}
      primaryText={`${streetName} ${streetNumber}`}
    />)}
  </SelectField>
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
