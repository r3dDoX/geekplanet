import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { UserAddressesPropType } from './order.proptypes';

const AddressChooser = ({ addresses, selectAddress }) => (<SelectField
  autoWidth
  floatingLabelText={<FormattedMessage id="ORDER.ADDRESS.FORM.NO_ADDRESS" />}
  onChange={(event, index, value) => selectAddress(value)}
>
  <MenuItem
    value=""
    primaryText={<FormattedMessage id="ORDER.ADDRESS.FORM.NO_ADDRESS" />}
  />
  {addresses.map(({ _id, streetName, streetNumber }) => <MenuItem
    key={_id}
    value={_id}
    primaryText={`${streetName} ${streetNumber}`}
  />)}
</SelectField>);

AddressChooser.propTypes = {
  addresses: UserAddressesPropType.isRequired,
  selectAddress: PropTypes.func.isRequired,
};

export default AddressChooser;
