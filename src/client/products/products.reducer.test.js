import underTest from './products.reducer';
import { FILTER_PRODUCTS, PRODUCTS_LOADED, TOGGLE_FILTER_CATEGORY } from '../actions';

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
    it('should set filterShown to true when setting filter categories', () => {
      const state = {
        categoriesToFilter: [],
        productFilters: {},
        products: [],
        filterShown: false,
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

      expect(newState.filterShown).toBe(true);
    });

    it('should filter products by category ids', () => {
      const state = {
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
});
