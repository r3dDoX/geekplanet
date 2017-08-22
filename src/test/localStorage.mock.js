let store = {};

const localStorageMock = {
  getItem(key) {
    return store[key];
  },
  setItem(key, value) {
    store[key] = value.toString();
  },
  clear() {
    store = {};
  },
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
