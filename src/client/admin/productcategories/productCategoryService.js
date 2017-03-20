import Xhr from '../../xhr';

export default {
  loadProductCategory() {
    return Xhr.get('/api/productcategories');
  },
  saveProductCategory(data) {
    return Xhr.put('/api/productcategories', data, 'application/json');
  },
};
