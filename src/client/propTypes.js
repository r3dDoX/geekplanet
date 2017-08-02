import PropTypes from 'prop-types';

export const ProductPropType = PropTypes.shape({
  _id: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  stock: PropTypes.number,
  description: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.string),
});

export const ShoppingCartItemPropType = PropTypes.shape({
  amount: PropTypes.number,
  product: ProductPropType,
});

export const ShoppingCartItemsPropType = PropTypes.arrayOf(ShoppingCartItemPropType);

export const ShoppingCartPropType = PropTypes.shape({
  id: PropTypes.string,
  items: ShoppingCartItemsPropType,
});

export const UserAddressPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  streetAddress: PropTypes.string.isRequired,
  zip: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
});

export const UserAddressesPropType = PropTypes.arrayOf(UserAddressPropType);

export const OrderPropType = PropTypes.shape({
  step: PropTypes.number.isRequired,
  addresses: UserAddressesPropType.isRequired,
  selectedAddress: UserAddressPropType,
  processing: PropTypes.bool.isRequired,
});

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
  parentCategory: PropTypes.string,
  de: {
    name: PropTypes.string,
  },
});
