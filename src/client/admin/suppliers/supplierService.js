import Xhr from '../../xhr';

export default {
  loadSuppliers() {
    return Xhr.get('/api/suppliers');
  },
  saveSupplier(data) {
    return Xhr.post('/api/suppliers', data);
  },
};
