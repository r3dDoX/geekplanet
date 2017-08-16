import underTest from './products.reducer';
import { FILTER_PRODUCTS, TOGGLE_FILTER_CATEGORY } from '../actions';

describe('Products Reducer', () => {
  describe('FILTER_PRODUCTS', () => {
    it('should filter products by german name and shortDescription', () => {
      const state = {
        categoriesToFilter: [],
        products: [
          {
            de: {
              name: 'Product abc',
              shortDescription: 'shortDescription',
            },
          },
          {
            de: {
              name: 'name',
              shortDescription: 'some abc product',
            },
          },
          {
            de: {
              name: 'name',
              shortDescription: 'shortDescription',
            },
          },
        ],
      };
      const action = {
        type: FILTER_PRODUCTS,
        filterString: 'abc',
      };

      const newState = underTest(state, action);

      expect(newState.filteredProducts).toHaveLength(2);
      expect(newState.filteredProducts[0].de.name).toBe('Product abc');
      expect(newState.filteredProducts[1].de.shortDescription).toBe('some abc product');
    });
  });

  describe('TOGGLE_FILTER_CATEGORY', () => {
    it('should filter products by category ids', () => {
      const state = {
        categoriesToFilter: [],
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
  });
});
