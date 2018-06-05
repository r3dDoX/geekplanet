import Xhr from '../../xhr';

export default {
  loadProductCategories() {
    return Xhr.get('/api/products/categories');
  },
  saveProductCategory(data) {
    return Xhr.put('/api/products/categories', data);
  },
};
