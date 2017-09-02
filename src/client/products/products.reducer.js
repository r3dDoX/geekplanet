import flatten from 'lodash.flatten';
import {
  FILTER_PRODUCTS,
  PRODUCT_CATEGORIES_LOADED,
  PRODUCT_LOADING,
  PRODUCT_SELECTED,
  PRODUCTS_LOADED,
  PUBLIC_PRODUCERS_LOADED,
  RESET_FILTER,
  TOGGLE_FILTER_CATEGORY,
  TOGGLE_FILTER_PRODUCER,
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
  groupedProductCategories: [],
  producers: [],
  filteredProducts: [],
  filterString: '',
  categoriesToFilter: [],
  producersToFilter: [],
  selectedProduct: undefined,
  productLoading: false,
  productFilters: {},
  filterShown: false,
  moreFiltersCount: 0,
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

function recursivelyMapSubCategories(category, categories) {
  return Object.assign({}, category, {
    subCategories: categories
      .filter(subCategory => subCategory.parentCategory === category._id)
      .map(subCategory => recursivelyMapSubCategories(subCategory, categories)),
  });
}

function calculateFilterAmount(categoriesToFilter, producersToFilter) {
  return categoriesToFilter.length + producersToFilter.length;
}

function recursivelyMapIds(category) {
  return [
    category._id,
    ...flatten(category.subCategories.map(recursivelyMapIds)),
  ];
}

function recursivelyMapIdsIfNotPresent(presentCategories, category) {
  const arr = [];

  if (!presentCategories.some(presentCategory => presentCategory._id === category._id)) {
    arr.push(category);
  }

  return arr.concat(flatten(category.subCategories.map(
    subCategory => recursivelyMapIdsIfNotPresent(presentCategories, subCategory),
  )));
}

export default (state = initialState, {
  type,
  products,
  productCategories,
  producers,
  selectedProduct,
  filterString,
  productCategory,
  productCategoryAdded,
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
        groupedProductCategories: productCategories
          .filter(category => !category.parentCategory)
          .map(category => recursivelyMapSubCategories(category, productCategories)),
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
      let filterCategories;

      if (productCategoryAdded) {
        filterCategories = state.categoriesToFilter.concat(
          recursivelyMapIdsIfNotPresent(state.categoriesToFilter, productCategory),
        );
      } else {
        const idsToRemove = recursivelyMapIds(productCategory);

        filterCategories = state.categoriesToFilter.filter(
          category => !idsToRemove.includes(category._id),
        );
      }

      const productFilters = Object.assign(state.productFilters, {
        filterProductsByCategories: filteredProducts =>
          filterProductsByCategories(filteredProducts, filterCategories),
      });
      productFilters.filterProductsByCategories.priority = 2;

      return Object.assign({}, state, {
        categoriesToFilter: filterCategories,
        productFilters,
        filteredProducts: filterProducts(state.products, productFilters),
        moreFiltersCount: calculateFilterAmount(filterCategories, state.producersToFilter),
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
        moreFiltersCount: calculateFilterAmount(state.categoriesToFilter, producers),
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
        moreFiltersCount: initialState.moreFiltersCount,
        filterShown: initialState.filterShown,
      });
    case TOGGLE_FILTER_VIEW:
      return Object.assign({}, state, {
        filterShown: !state.filterShown,
      });
    default:
      return state;
  }
};
