export const ids = {
  ID_TOKEN: 'ID_TOKEN',
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  SHOPPING_CART: 'SHOPPING_CART',
};

export const store = (id, data) => localStorage.setItem(id, JSON.stringify(data));

export const load = id => JSON.parse(localStorage.getItem(id));

export const remove = id => localStorage.removeItem(id);
