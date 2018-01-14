import {
  PRODUCT_CATEGORIES_LOADED, PRODUCTS_LOADED,
  RESET_FILTER, SET_FILTER,
} from '../actions';
import underTest from './products.reducer';

describe('Products Reducer', () => {
  describe(SET_FILTER, () => {
    it('should count producers filtered', () => {
      const action = {
        type: SET_FILTER,
        producers: [
          {
            _id: 'producerId1',
          },
          {
            _id: 'producerId',
          },
        ],
        productCategories: [{
          _id: 'categoryId1',
          subCategories: [],
        }],
      };

      const newState = underTest(undefined, action);

      expect(newState.moreFiltersCount).toBe(3);
    });

    it('should filter products by category and producer ids', () => {
      const state = {
        producersToFilter: [],
        categoriesToFilter: [],
        productFilters: {},
        products: [
          {
            category: 'categoryId0',
          },
          {
            category: 'categoryId1',
            producer: 'producerId7',
          },
          {
            category: 'categoryId1',
          },
        ],
      };
      const action = {
        type: SET_FILTER,
        productCategories: [
          {
            _id: 'categoryId1',
            subCategories: [],
          },
          {
            _id: 'categoryId2',
            subCategories: [],
          },
        ],
        producers: [
          {
            _id: 'producerId7',
          },
        ],
      };

      const newState = underTest(state, action);

      expect(newState.filteredProducts).toHaveLength(1);
      expect(newState.filteredProducts[0].category).toBe('categoryId1');
    });

    it('should filter products by categories and subcategories', () => {
      const state = {
        producersToFilter: [],
        categoriesToFilter: [],
        productFilters: {},
        products: [
          {
            category: 'categoryId',
          },
          {
            category: 'subCategoryId',
          },
          {
            category: 'otherParentId',
          },
          {
            category: 'secondSubCategoryId',
          },
        ],
      };
      const action = {
        type: SET_FILTER,
        productCategories: [
          {
            _id: 'categoryId',
            subCategories: [
              {
                _id: 'someOtherId',
                subCategories: [
                  {
                    _id: 'subCategoryId',
                    subCategories: [],
                  },
                ],
              },
            ],
          },
          {
            _id: 'otherCategoryId',
            subCategories: [
              {
                _id: 'secondSubCategoryId',
                subCategories: [],
              },
            ],
          },
        ],
      };

      const newState = underTest(state, action);

      expect(newState.filteredProducts).toHaveLength(3);
      expect(newState.filteredProducts[0].category).toBe('categoryId');
      expect(newState.filteredProducts[1].category).toBe('subCategoryId');
      expect(newState.filteredProducts[2].category).toBe('secondSubCategoryId');
    });

    it('should filter products by german name', () => {
      const state = {
        categoriesToFilter: [],
        productFilters: {},
        products: [
          {
            de: {
              name: 'Product Abc',
              shortDescription: 'shortDescription',
            },
            tags: [],
          },
          {
            de: {
              name: 'name',
              shortDescription: 'shortDescription',
            },
            tags: [],
          },
        ],
      };
      const action = {
        type: SET_FILTER,
        filterString: 'abc',
      };

      const newState = underTest(state, action);

      expect(newState.filteredProducts).toHaveLength(1);
      expect(newState.filteredProducts[0].de.name).toBe('Product Abc');
    });

    it('should filter products by german name when some props missing', () => {
      const state = {
        categoriesToFilter: [],
        productFilters: {},
        products: [
          {
            de: {
              name: 'Product Abc',
            },
            tags: [],
          },
          {
            de: {
              shortDescription: 'shortDescription',
            },
            tags: [],
          },
        ],
      };
      const action = {
        type: SET_FILTER,
        filterString: 'abc',
      };

      const newState = underTest(state, action);

      expect(newState.filteredProducts).toHaveLength(1);
      expect(newState.filteredProducts[0].de.name).toBe('Product Abc');
    });

    it('should filter products by german shortDescription', () => {
      const state = {
        categoriesToFilter: [],
        productFilters: {},
        products: [
          {
            de: {
              name: 'name',
              shortDescription: 'Product aBc',
            },
            tags: [],
          },
          {
            de: {
              name: 'name',
              shortDescription: 'shortDescription',
            },
            tags: [],
          },
        ],
      };
      const action = {
        type: SET_FILTER,
        filterString: 'abc',
      };

      const newState = underTest(state, action);

      expect(newState.filteredProducts).toHaveLength(1);
      expect(newState.filteredProducts[0].de.shortDescription).toBe('Product aBc');
    });

    it('should filter products by tags', () => {
      const state = {
        categoriesToFilter: [],
        productFilters: {},
        products: [
          {
            de: {
              name: 'name',
              shortDescription: 'shortDescription',
            },
            tags: [
              'tag abc',
              'tag efg',
            ],
          },
          {
            de: {
              name: 'name',
              shortDescription: 'shortDescription',
            },
            tags: [
              'tag1',
              'tag2',
            ],
          },
          {
            de: {
              name: 'name',
              shortDescription: 'shortDescription',
            },
            tags: [
              'aBc',
            ],
          },
        ],
      };
      const action = {
        type: SET_FILTER,
        filterString: 'abc',
      };

      const newState = underTest(state, action);

      expect(newState.filteredProducts).toHaveLength(2);
      expect(newState.filteredProducts[0].tags[0]).toBe('tag abc');
      expect(newState.filteredProducts[1].tags[0]).toBe('aBc');
    });
  });

  describe(PRODUCTS_LOADED, () => {
    it('should set loaded products in state', () => {
      const state = {
        categoriesToFilter: [],
        productFilters: {},
        products: [],
      };
      const action = {
        type: PRODUCTS_LOADED,
        products: [
          {
            de: {
              name: 'Product Blubb',
              shortDescription: 'shortDescription',
            },
            tags: [],
          },
        ],
      };

      const result = underTest(state, action);

      expect(result.products).toBe(action.products);
      expect(result.filteredProducts).toHaveLength(1);
    });

    it('should apply set filters to filteredProducts', () => {
      const state = {
        categoriesToFilter: [],
        productFilters: {},
        products: [],
      };
      const filterAction = {
        type: SET_FILTER,
        filterString: 'blubb',
      };
      const intermediateState = underTest(state, filterAction);
      const action = {
        type: PRODUCTS_LOADED,
        products: [
          {
            de: {
              name: 'Product Blubb',
              shortDescription: 'shortDescription',
            },
            tags: [],
          },
          {
            de: {
              name: 'name',
              shortDescription: 'shortDescription',
            },
            tags: [],
          },
        ],
      };

      const result = underTest(intermediateState, action);

      expect(result.products).toBe(action.products);
      expect(result.filteredProducts).toHaveLength(1);
      expect(result.filteredProducts[0].de.name).toBe('Product Blubb');
    });
  });

  describe(PRODUCT_CATEGORIES_LOADED, () => {
    it('should map loaded categories to tree structure', () => {
      const productCategories = [
        {
          _id: 'parentProduct',
          de: { name: 'some Parent Product' },
        },
        {
          _id: 'someOtherParentProduct',
          de: { name: 'some other Parent Product' },
        },
        {
          _id: 'childProduct',
          de: { name: 'some Child Product' },
          parentCategory: 'parentProduct',
        },
        {
          _id: 'childChildProduct',
          de: { name: 'some Child Child Product' },
          parentCategory: 'childProduct',
        },
      ];
      const action = {
        type: PRODUCT_CATEGORIES_LOADED,
        productCategories,
      };

      const result = underTest(undefined, action);

      expect(result.groupedProductCategories).toHaveLength(2);
      expect(result.groupedProductCategories[0].subCategories).toHaveLength(1);
      expect(result.groupedProductCategories[0].subCategories[0].subCategories).toHaveLength(1);
    });
  });

  describe(RESET_FILTER, () => {
    it('should reset filter count', () => {
      const state = {
        products: [],
        productFilters: {},
        moreFiltersCount: 15,
      };
      const action = {
        type: RESET_FILTER,
      };

      const result = underTest(state, action);

      expect(result.moreFiltersCount).toBe(0);
    });

    it('should reset filterShown', () => {
      const state = {
        products: [],
        productFilters: {},
        filterShown: true,
      };
      const action = {
        type: RESET_FILTER,
      };

      const result = underTest(state, action);

      expect(result.filterShown).toBe(false);
    });
  });
});
