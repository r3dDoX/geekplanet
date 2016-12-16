import Xhr from '../xhr';

export default {
  loadProducts() {
    return Xhr.get('/api/products');
  },
  loadProductCategories() {
    return Xhr.get('/api/productcategories');
  },
  saveProduct(data) {
    return Xhr.post('/api/products', data);
  },
  saveProductCategory(data) {
    return Xhr.post('/api/productcategories', data);
  },
};
