import { PropTypes } from 'react';

export const AddressPropType = PropTypes.shape({
  streetAddress: PropTypes.string,
  zip: PropTypes.number,
  city: PropTypes.string,
  country: PropTypes.string,
});

export const ProducerPropType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  vatNumber: PropTypes.string,
  contactName: PropTypes.string,
  contactEmail: PropTypes.string,
  contactPhone: PropTypes.string,
  remarks: PropTypes.string,
  address: AddressPropType,
});

export const SupplierPropType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  vatNumber: PropTypes.string,
  contactName: PropTypes.string,
  contactEmail: PropTypes.string,
  contactPhone: PropTypes.string,
  customerNumber: PropTypes.string,
  remarks: PropTypes.string,
  address: AddressPropType,
});

export const ProductCategoryPropType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
});

export default ProducerPropType;
