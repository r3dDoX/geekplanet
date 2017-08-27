import {
  TOGGLE_FILTER_CATEGORY,
  FILTER_PRODUCTS,
  PRODUCT_CATEGORIES_LOADED,
  PRODUCT_LOADING,
  PRODUCT_SELECTED,
  PRODUCTS_LOADED,
  RESET_FILTER,
  TOGGLE_FILTER_PRODUCER,
  PUBLIC_PRODUCERS_LOADED,
  TOGGLE_FILTER_VIEW,
} from '../actions';

const fieldNamesToFilter = [
  'de.name',
  'de.shortDescription',
  'tags',
];

const initialState = {
  products: [],
  productCategories: [],
  producers: [],
  filteredProducts: [],
  filterString: '',
  categoriesToFilter: [],
  producersToFilter: [],
  selectedProduct: undefined,
  productLoading: false,
  productFilters: {},
  filterShown: false,
};

function getPropByString(obj, prop) {
  return prop.split('.').reduce((actObj, identifier) => actObj[identifier], obj);
}

function filterProductsByCategories(products, categoriesToFilter) {
  if (!categoriesToFilter.length) {
    return products;
  }

  return products.filter(product =>
    categoriesToFilter.some(productCategory => productCategory._id === product.category),
  );
}

function filterProductsByProducers(products, producersToFilter) {
  if (!producersToFilter.length) {
    return products;
  }

  return products.filter(product =>
    producersToFilter.some(producer => producer._id === product.producer),
  );
}

function filterProductsByString(products, filterString) {
  if (!filterString) {
    return products;
  }

  const splittedFilterString = filterString.toLowerCase().split(' ');

  return products.filter(product =>
    splittedFilterString.every(filterWord =>
      fieldNamesToFilter.map(
        (fieldName) => {
          let value = getPropByString(product, fieldName);

          if (value instanceof Array) {
            value = value.join('');
          }

          return value.toLowerCase();
        })
        .some(fieldValue => fieldValue.includes(filterWord)),
    ),
  );
}

function filterProducts(products, productFilters) {
  return Object.values(productFilters)
    .sort((a, b) => a.priority - b.priority)
    .reduce(
      (filteredProducts, actFilter) => actFilter(filteredProducts),
      products,
    );
}

export default (state = initialState, {
  type,
  products,
  productCategories,
  producers,
  selectedProduct,
  filterString,
}) => {
  switch (type) {
    case PRODUCTS_LOADED:
      return Object.assign({}, state, {
        products,
        filteredProducts: filterProducts(products, state.productFilters),
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
    case PUBLIC_PRODUCERS_LOADED:
      return Object.assign({}, state, {
        producers,
      });
    case FILTER_PRODUCTS: {
      const productFilters = Object.assign(state.productFilters, {
        filterProductsByString: filteredProducts =>
          filterProductsByString(filteredProducts, filterString),
      });
      productFilters.filterProductsByString.priority = 10;

      return Object.assign({}, state, {
        filterString,
        productFilters,
        filteredProducts: filterProducts(state.products, productFilters),
      });
    }
    case TOGGLE_FILTER_CATEGORY: {
      const productFilters = Object.assign(state.productFilters, {
        filterProductsByCategories: filteredProducts =>
          filterProductsByCategories(filteredProducts, productCategories),
      });
      productFilters.filterProductsByCategories.priority = 2;

      return Object.assign({}, state, {
        categoriesToFilter: productCategories,
        productFilters,
        filteredProducts: filterProducts(state.products, productFilters),
        filterShown: true,
      });
    }
    case TOGGLE_FILTER_PRODUCER: {
      const productFilters = Object.assign(state.productFilters, {
        filterProductsByProducers: filteredProducts =>
          filterProductsByProducers(filteredProducts, producers),
      });
      productFilters.filterProductsByProducers.priority = 1;

      return Object.assign({}, state, {
        producersToFilter: producers,
        productFilters,
        filteredProducts: filterProducts(state.products, productFilters),
      });
    }
    case PRODUCT_LOADING:
      return Object.assign({}, state, {
        productLoading: true,
      });
    case RESET_FILTER:
      return Object.assign({}, state, {
        filterString: initialState.filterString,
        categoriesToFilter: initialState.categoriesToFilter,
        producersToFilter: initialState.producersToFilter,
        filteredProducts: state.products,
        productFilters: {},
      });
    case TOGGLE_FILTER_VIEW:
      return Object.assign({}, state, {
        filterShown: !state.filterShown,
      });
    default:
      return state;
  }
};
