import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { UserAddressesPropType } from '../propTypes';

const StyledSelect = styled(Select)`
  min-width: 240px;
`;

const AddressChooser = ({
  addresses,
  selectAddress,
  selectedAddressId,
}) => (
  <FormControl>
    <InputLabel htmlFor="address-chooser">
      <FormattedMessage id="ORDER.ADDRESS.FORM.NO_ADDRESS" />
    </InputLabel>
    <StyledSelect
      autoWidth
      onChange={event => selectAddress(event.target.value)}
      value={selectedAddressId}
      inputProps={{
        name: 'chooseAddress',
        id: 'address-chooser',
      }}
      fullWidth
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
    </StyledSelect>
  </FormControl>
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
