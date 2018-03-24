import PropTypes from 'prop-types';

// for nested proptypes
function lazyFunction(f) {
  return function () { // eslint-disable-line func-names
    return f().apply(this, arguments); // eslint-disable-line prefer-rest-params
  };
}

export const ProductPropType = PropTypes.shape({
  _id: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  originalPrice: PropTypes.number,
  stock: PropTypes.number,
  de: PropTypes.shape({
    name: PropTypes.string,
    shortDescription: PropTypes.string,
  }),
  tags: PropTypes.arrayOf(PropTypes.string),
  files: PropTypes.arrayOf(PropTypes.string),
});

export const CompleteProductPropType = PropTypes.shape({
  _id: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  stock: PropTypes.number,
  de: PropTypes.shape({
    name: PropTypes.string,
    shortDescription: PropTypes.string,
    description: PropTypes.string,
    specifications: PropTypes.arrayOf(PropTypes.string),
    delivery: PropTypes.arrayOf(PropTypes.string),
    downloads: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      href: PropTypes.string,
    })),
  }),
  tags: PropTypes.arrayOf(PropTypes.string),
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
  itemTotal: PropTypes.number,
  total: PropTypes.number,
  hasShippingCosts: PropTypes.bool,
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

export const OrderStatePropType = PropTypes.shape({
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
  subCategories: PropTypes.arrayOf(lazyFunction(() => ProductCategoryPropType)),
});

export const CouponPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
});

export const OrderPropType = PropTypes.shape({
  _id: PropTypes.string,
  user: PropTypes.string,
  state: PropTypes.string,
  address: AddressPropType,
  date: PropTypes.string,
  items: ShoppingCartItemsPropType,
  coupons: PropTypes.arrayOf(CouponPropType),
});

export const HomeTilePropType = PropTypes.shape({
  category: PropTypes.string.isRequired,
  de: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  picture: PropTypes.string.isRequired,
});

export const OrdersPropType = PropTypes.arrayOf(OrderPropType);
