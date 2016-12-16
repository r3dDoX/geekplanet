function get(path) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror = () => reject(xhr.response);
    xhr.send();
  });
}

export default {
  loadProducts() {
    return get('/api/products');
  },
  loadProductCategories() {
    return get('/api/productcategories');
  },
};
