import {
  TOGGLE_FILTER_CATEGORY,
  FILTER_PRODUCTS, PRODUCT_CATEGORIES_LOADED,
  PRODUCT_LOADING,
  PRODUCT_SELECTED,
  PRODUCTS_LOADED,
  SPOTLIGHT_PRODUCTS_LOADED, RESET_FILTER,
} from '../actions';

const fieldNamesToFilter = [
  'name',
  'shortDescription',
];

const initialState = {
  spotlightProducts: [],
  products: [],
  productCategories: [],
  filteredProducts: [],
  filterString: '',
  categoriesToFilter: [],
  selectedProduct: undefined,
  productLoading: false,
};

function filterProducts(products, filterString, categoriesToFilter) {
  let filteredProducts;

  if (!categoriesToFilter.length) {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(product =>
      categoriesToFilter.some(productCategory => productCategory._id === product.category),
    );
  }

  if (!filterString) {
    return filteredProducts;
  }

  const splittedFilterString = filterString.toLowerCase().split(' ');

  return filteredProducts.filter(product =>
    splittedFilterString.every((filterWord) => {
      const fieldValuesToFilter = fieldNamesToFilter.map(
        fieldName => product.de[fieldName].toLowerCase(),
      );

      return fieldValuesToFilter.some(fieldValue => fieldValue.includes(filterWord));
    }),
  );
}

export default (state = initialState, {
  type,
  spotlightProducts,
  products,
  productCategories,
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
    case PRODUCT_CATEGORIES_LOADED:
      return Object.assign({}, state, {
        productCategories,
      });
    case FILTER_PRODUCTS:
      return Object.assign({}, state, {
        filterString,
        filteredProducts: filterProducts(state.products, filterString, state.categoriesToFilter),
      });
    case TOGGLE_FILTER_CATEGORY:
      return Object.assign({}, state, {
        categoriesToFilter: productCategories,
        filteredProducts: filterProducts(state.products, state.filterString, productCategories),
      });
    case PRODUCT_LOADING:
      return Object.assign({}, state, {
        productLoading: true,
      });
    case RESET_FILTER:
      return Object.assign({}, state, {
        filterString: initialState.filterString,
        categoriesToFilter: initialState.categoriesToFilter,
        filteredProducts: state.products,
      });
    default:
      return state;
  }
};
