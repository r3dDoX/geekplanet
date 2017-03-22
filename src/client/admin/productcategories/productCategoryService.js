import Xhr from '../../xhr';

export default {
  loadProductCategories() {
    return Xhr.get('/api/productcategories');
  },
  saveProductCategory(data) {
    return Xhr.put('/api/productcategories', data);
  },
};
