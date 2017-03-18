import { PropTypes } from 'react';

export const UserAddressPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  streetName: PropTypes.string.isRequired,
  streetNumber: PropTypes.number.isRequired,
  zip: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
});

export const UserAddressesPropType = PropTypes.arrayOf(UserAddressPropType);

export default PropTypes.shape({
  step: PropTypes.number.isRequired,
  addresses: UserAddressesPropType.isRequired,
  selectedAddress: UserAddressPropType,
});
