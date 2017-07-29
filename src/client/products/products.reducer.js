import {
  PRODUCT_LOADING,
  PRODUCT_SELECTED,
  FILTER_PRODUCTS,
  PRODUCTS_LOADED,
  SPOTLIGHT_PRODUCTS_LOADED,
} from '../actions';

const fieldNamesToFilter = [
  'name',
  'shortDescription',
];

const initialState = {
  spotlightProducts: [],
  products: [],
  filteredProducts: [],
  selectedProduct: undefined,
  productLoading: false,
};

export default (state = initialState, {
  type,
  spotlightProducts,
  products,
  selectedProduct,
  filterString,
}) => {
  switch (type) {
    case SPOTLIGHT_PRODUCTS_LOADED:
      return Object.assign({}, state, {
        spotlightProducts,
      });
    case PRODUCTS_LOADED:
      return Object.assign({}, state, {
        products,
        filteredProducts: products,
      });
    case PRODUCT_SELECTED:
      return Object.assign({}, state, {
        selectedProduct,
        productLoading: false,
      });
    case FILTER_PRODUCTS: {
      if (!filterString) {
        return Object.assign({}, state, {
          filteredProducts: state.products,
        });
      }

      const splittedFilterString = filterString.toLowerCase().split(' ');

      return Object.assign({}, state, {
        filteredProducts: state.products.filter(product =>
          splittedFilterString.every((filterWord) => {
            const fieldValuesToFilter = fieldNamesToFilter.map(
              fieldName => product.de[fieldName].toLowerCase(),
            );

            return fieldValuesToFilter.some(fieldValue => fieldValue.includes(filterWord));
          }),
        ),
      });
    }
    case PRODUCT_LOADING:
      return Object.assign({}, state, {
        productLoading: true,
      });
    default:
      return state;
  }
};
