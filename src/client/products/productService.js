import Xhr from '../xhr';

export function loadProducts() {
  return Xhr.get('/api/completeProducts');
}

export function saveProduct(data) {
  return Xhr.put('/api/products', data);
}

export function savePictures(formData) {
  return Xhr.postMultipart('/api/products/pictures', formData);
}

export function removePicture(pictureId) {
  return Xhr.deleteHttp(`/api/products/pictures/${pictureId}`);
}

export function getPictureUrl(pictureId, size = 's') {
  return `/api/products/pictures/${pictureId}_${size}`;
}
