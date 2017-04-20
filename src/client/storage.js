export const ids = {
  ID_TOKEN: 'ID_TOKEN',
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  SHOPPING_CART: 'SHOPPING_CART',
  REDIRECT_URI: 'REDIRECT_URI',
};

export const store = (id, data) => localStorage.setItem(id, JSON.stringify(data));

export const load = id => JSON.parse(localStorage.getItem(id));

export const remove = id => localStorage.removeItem(id);
