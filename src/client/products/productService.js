import Xhr from '../xhr';

export default {
  loadProducts() {
    return Xhr.get('/api/completeProducts');
  },
  saveProduct(data) {
    return Xhr.put('/api/products', data);
  },

  savePictures(formData) {
    return Xhr.postMultipart('/api/products/pictures', formData);
  },

  removePicture(pictureId) {
    return Xhr.deleteHttp(`/api/products/pictures/${pictureId}`);
  },

  getPictureUrl(pictureId, size = 's') {
    return `/api/products/pictures/${pictureId}_${size}`;
  },
};
