import underTest from './shoppingCart.reducer';
import { ADD_ITEM_TO_SHOPPING_CART, PRODUCTS_LOADED, SET_SHOPPING_CART_AMOUNT } from '../actions';
import * as storage from '../storage';

describe('ShoppingCart Reducer', () => {
  describe(ADD_ITEM_TO_SHOPPING_CART, () => {
    it('should add new item with amount 1 to items', () => {
      const state = {
        items: [],
      };

      const action = {
        type: ADD_ITEM_TO_SHOPPING_CART,
        data: {
          _id: 'product1',
        },
      };

      const result = underTest(state, action);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].amount).toBe(1);
      expect(result.items[0].product._id).toBe('product1');
    });

    it('should increase amount when product already in cart', () => {
      const state = {
        items: [
          {
            amount: 2,
            product: {
              _id: 'product1',
            },
          },
        ],
      };

      const action = {
        type: ADD_ITEM_TO_SHOPPING_CART,
        data: {
          _id: 'product1',
        },
      };

      const result = underTest(state, action);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].amount).toBe(3);
    });

    it('should calculate new item total', () => {
      const state = {
        items: [
          {
            amount: 2,
            product: {
              _id: 'product1',
              price: 0.1,
            },
          },
        ],
      };

      const action = {
        type: ADD_ITEM_TO_SHOPPING_CART,
        data: {
          _id: 'product2',
          price: 0.1,
        },
      };

      const result = underTest(state, action);

      expect(result.itemTotal).toBe(0.3);
    });

    it('should add SHIPPING_COST when under MIN_PRICE_SHIPPING', () => {
      const state = {
        items: [
          {
            amount: 1,
            product: {
              _id: 'product1',
              price: 49,
            },
          },
        ],
      };

      const action = {
        type: ADD_ITEM_TO_SHOPPING_CART,
        data: {
          _id: 'product2',
          price: 0.95,
        },
      };

      const result = underTest(state, action);

      expect(result.itemTotal).toBe(49.95);
      expect(result.total).toBe(58.95);
      expect(result.hasShippingCosts).toBe(true);
    });
  });

  describe(SET_SHOPPING_CART_AMOUNT, () => {
    it('should remove item when product amount 0', () => {
      const state = {
        items: [
          {
            amount: 1,
            product: {
              _id: 'product1',
            },
          },
        ],
      };

      const action = {
        type: SET_SHOPPING_CART_AMOUNT,
        data: {
          product: {
            _id: 'product1',
          },
          amount: 0,
        },
      };

      const result = underTest(state, action);

      expect(result.items).toHaveLength(0);
    });

    it('should set amount when product amount more than zero', () => {
      const state = {
        items: [
          {
            amount: 2,
            product: {
              _id: 'product1',
            },
          },
        ],
      };

      const action = {
        type: SET_SHOPPING_CART_AMOUNT,
        data: {
          product: {
            _id: 'product1',
          },
          amount: 1,
        },
      };

      const result = underTest(state, action);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].amount).toBe(1);
    });

    it('should calculate new totals', () => {
      const state = {
        items: [
          {
            amount: 2,
            product: {
              _id: 'product1',
              price: 12.5,
            },
          },
        ],
      };

      const action = {
        type: SET_SHOPPING_CART_AMOUNT,
        data: {
          product: {
            _id: 'product1',
          },
          amount: 4,
        },
      };

      const result = underTest(state, action);

      expect(result.itemTotal).toBe(50);
      expect(result.total).toBe(50);
      expect(result.hasShippingCosts).toBe(false);
    });

    it('should not add shipping cost when not items', () => {
      const state = {
        items: [
          {
            amount: 1,
            product: {
              _id: 'product1',
              price: 12.5,
            },
          },
        ],
        itemTotal: 12.5,
        total: 21.5,
        hasShippingCosts: true,
      };

      const action = {
        type: SET_SHOPPING_CART_AMOUNT,
        data: {
          product: {
            _id: 'product1',
          },
          amount: 0,
        },
      };

      const result = underTest(state, action);

      expect(result.itemTotal).toBe(0);
      expect(result.total).toBe(0);
      expect(result.hasShippingCosts).toBe(false);
    });
  });

  describe(PRODUCTS_LOADED, () => {
    it('should update products in cart', () => {
      const storedState = {
        items: [
          {
            amount: 1,
            product: {
              _id: 'product1',
              price: 12.5,
            },
          },
          {
            amount: 4,
            product: {
              _id: 'product34',
              price: 32,
            },
          },
        ],
        itemTotal: 324,
        total: 0,
      };
      storage.store(storage.ids.SHOPPING_CART, storedState);

      const action = {
        type: PRODUCTS_LOADED,
        products: [
          {
            _id: 'product34',
            price: 2.20,
            de: {
              name: 'Fixed Name',
            },
          },
        ],
      };

      const result = underTest(undefined, action);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].product).toEqual(action.products[0]);
      expect(result.items[0].amount).toEqual(storedState.items[1].amount);
      expect(result.itemTotal).toEqual(8.8);
      expect(result.total).toEqual(17.8);
    });

    it('should store updated cart', () => {
      const storedState = {
        items: [
          {
            amount: 1,
            product: {
              _id: 'product1',
              price: 12.5,
            },
          },
        ],
      };
      storage.store(storage.ids.SHOPPING_CART, storedState);

      const action = {
        type: PRODUCTS_LOADED,
        products: [
          {
            _id: 'product1',
            price: 2.20,
          },
        ],
      };

      underTest(undefined, action);

      const loadedState = storage.load(storage.ids.SHOPPING_CART);

      expect(loadedState.items[0].product).toEqual(action.products[0]);
    });
  });
});
