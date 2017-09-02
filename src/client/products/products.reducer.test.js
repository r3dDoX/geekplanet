import underTest from './products.reducer';
import {
  FILTER_PRODUCTS,
  PRODUCT_CATEGORIES_LOADED,
  PRODUCTS_LOADED, RESET_FILTER,
  TOGGLE_FILTER_CATEGORY,
  TOGGLE_FILTER_PRODUCER,
} from '../actions';

describe('Products Reducer', () => {
  describe(FILTER_PRODUCTS, () => {
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
        type: FILTER_PRODUCTS,
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
        type: FILTER_PRODUCTS,
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
        type: FILTER_PRODUCTS,
        filterString: 'abc',
      };

      const newState = underTest(state, action);

      expect(newState.filteredProducts).toHaveLength(2);
      expect(newState.filteredProducts[0].tags[0]).toBe('tag abc');
      expect(newState.filteredProducts[1].tags[0]).toBe('aBc');
    });

    it('should update filter on second action', () => {
      const state = {
        categoriesToFilter: [],
        productFilters: {},
        products: [
          {
            de: {
              name: 'Product efg',
              shortDescription: 'shortDescription',
            },
            tags: [],
          },
          {
            de: {
              name: 'name',
              shortDescription: 'some ef product',
            },
            tags: [],
          },
        ],
      };
      const action = {
        type: FILTER_PRODUCTS,
        filterString: 'ef',
      };
      const action2 = {
        type: FILTER_PRODUCTS,
        filterString: 'efg',
      };

      const intermediateState = underTest(state, action);
      const newState = underTest(intermediateState, action2);

      expect(newState.filteredProducts).toHaveLength(1);
      expect(newState.filteredProducts[0].de.name).toBe('Product efg');
    });
  });

  describe(TOGGLE_FILTER_CATEGORY, () => {
    it('should count categories filtered', () => {
      const action = {
        type: TOGGLE_FILTER_CATEGORY,
        productCategories: [
          {
            _id: 'categoryId1',
          },
          {
            _id: 'categoryId',
          },
        ],
      };

      const newState = underTest(undefined, action);

      expect(newState.moreFiltersCount).toBe(2);
    });

    it('should filter products by category ids', () => {
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
          },
        ],
      };
      const action = {
        type: TOGGLE_FILTER_CATEGORY,
        productCategories: [
          {
            _id: 'categoryId1',
          },
        ],
      };

      const newState = underTest(state, action);

      expect(newState.filteredProducts).toHaveLength(1);
      expect(newState.filteredProducts[0].category).toBe('categoryId1');
    });

    it('should update filter on second action', () => {
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
          },
          {
            category: 'categoryId2',
          },
        ],
      };
      const action = {
        type: TOGGLE_FILTER_CATEGORY,
        productCategories: [
          {
            _id: 'categoryId1',
          },
        ],
      };
      const action2 = {
        type: TOGGLE_FILTER_CATEGORY,
        productCategories: [
          {
            _id: 'categoryId1',
          },
          {
            _id: 'categoryId0',
          },
        ],
      };

      const intermediateState = underTest(state, action);
      const newState = underTest(intermediateState, action2);

      expect(newState.filteredProducts).toHaveLength(2);
      expect(newState.filteredProducts[0].category).toBe('categoryId0');
      expect(newState.filteredProducts[1].category).toBe('categoryId1');
    });
  });

  describe(TOGGLE_FILTER_PRODUCER, () => {
    it('should count producers filtered', () => {
      const action = {
        type: TOGGLE_FILTER_PRODUCER,
        producers: [
          {
            _id: 'producerId1',
          },
          {
            _id: 'producerId',
          },
        ],
      };

      const newState = underTest(undefined, action);

      expect(newState.moreFiltersCount).toBe(2);
    });

    it('should add count to moreFiltersCount', () => {
      const categoryAction = {
        type: TOGGLE_FILTER_CATEGORY,
        productCategories: [
          {
            _id: 'someId',
          },
        ],
      };
      const action = {
        type: TOGGLE_FILTER_PRODUCER,
        producers: [
          {
            _id: 'producerId1',
          },
          {
            _id: 'producerId',
          },
        ],
      };

      const intermediateState = underTest(undefined, categoryAction);
      const result = underTest(intermediateState, action);

      expect(result.moreFiltersCount).toBe(3);
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
        type: FILTER_PRODUCTS,
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
        type: FILTER_PRODUCTS,
      };

      const result = underTest(state, action);

      expect(result.moreFiltersCount).toBe(0);
    });
  });
});
