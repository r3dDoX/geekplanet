import {
  TOGGLE_FILTER_CATEGORY,
  FILTER_PRODUCTS, PRODUCT_CATEGORIES_LOADED,
  PRODUCT_LOADING,
  PRODUCT_SELECTED,
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
  productCategories: [],
  filteredProducts: [],
  filterString: '',
  categoriesToFilter: [],
  selectedProduct: undefined,
  productLoading: false,
};

function filterProducts(products, filterString, categoriesToFilter) {
  if (!filterString && !categoriesToFilter.length) {
    return products;
  }

  const splittedFilterString = filterString.toLowerCase().split(' ');

  return products.filter(product =>
    categoriesToFilter.includes(product.category) && splittedFilterString.every((filterWord) => {
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
  productCategory,
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
    case TOGGLE_FILTER_CATEGORY: {
      let categoriesToFilter;

      if (state.categoriesToFilter.includes(productCategory)) {
        categoriesToFilter = state.categoriesToFilter.filter(
          actProductCategory => productCategory !== actProductCategory,
        );
      } else {
        categoriesToFilter = state.categoriesToFilter.concat(productCategory);
      }

      return Object.assign({}, state, {
        categoriesToFilter,
        filteredProducts: filterProducts(state.products, state.filterString, categoriesToFilter),
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
