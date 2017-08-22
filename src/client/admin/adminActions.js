import { change } from 'redux-form';
import {
  COMPLETE_PRODUCTS_LOADED,
  ORDERS_LOADED,
  PRODUCERS_LOADED,
  REMOVE_SELECTED_FILE,
  RESET_SELECTED_FILES,
  SELECT_PRODUCT,
  SELECT_UPLOAD_FILES,
  SET_TAGS,
  SUPPLIERS_LOADED,
  TAGS_LOADED,
} from '../actions';
import * as ProductService from '../products/productService';
import Xhr from '../xhr';
import ProducerService from './producers/producerService';
import SupplierService from './suppliers/supplierService';
import TagService from './tags/tagService';

export const productFormName = 'productForm';

export function createSelectFiles(selectedFiles, initialFiles) {
  const formData = new FormData();
  for (let i = 0; i < selectedFiles.length; i += 1) {
    formData.append('files[]', selectedFiles[i]);
  }

  return dispatch => ProductService.savePictures(formData)
    .then((savedFileIds) => {
      dispatch(({
        type: SELECT_UPLOAD_FILES,
        data: savedFileIds,
      }));
      dispatch(change(productFormName, 'files', initialFiles.concat(savedFileIds)));
    });
}

export const createRemoveFile = (initialFiles, fileIdToRemove) => dispatch =>
  ProductService.removePicture(fileIdToRemove)
    .then(() => {
      dispatch({
        type: REMOVE_SELECTED_FILE,
        data: fileIdToRemove,
      });
      dispatch(change(productFormName, 'files', initialFiles.filter(fileId => fileId !== fileIdToRemove)));
    });

export const createResetSelectedFiles = () => ({
  type: RESET_SELECTED_FILES,
});

export const createSelectProduct = product => ({
  type: SELECT_PRODUCT,
  data: product,
});

export const createLoadProducers = () => dispatch =>
  ProducerService.loadProducers().then(producers => dispatch({
    type: PRODUCERS_LOADED,
    data: producers,
  }));

export const createLoadSuppliers = () => dispatch =>
  SupplierService.loadSuppliers().then(suppliers => dispatch({
    type: SUPPLIERS_LOADED,
    data: suppliers,
  }));

export const createTagsLoaded = tags => ({
  type: TAGS_LOADED,
  data: tags,
});

export const createLoadTags = () => dispatch =>
  TagService.loadTags().then(tags => dispatch(createTagsLoaded(tags)));

export const createSetTags = tags => ({
  type: SET_TAGS,
  data: tags,
});

export const createSelectTag = (tags, item, index) => (dispatch) => {
  if (index < 0) {
    TagService.saveTag({ name: item })
      .then(() => TagService.loadTags().then(loadedTags => dispatch(createTagsLoaded(loadedTags))));
  }
  const newTags = tags.concat(item);
  dispatch(createSetTags(newTags));
  dispatch(change(productFormName, 'tags', newTags));
};

export const createRemoveTag = (tags, tag) => (dispatch) => {
  const newTags = tags.filter(actTag => actTag !== tag);
  dispatch(createSetTags(newTags));
  dispatch(change(productFormName, 'tags', newTags));
};

export const createLoadCompleteProducts = () => dispatch =>
  Xhr.get('/api/completeProducts').then(products => dispatch({
    type: COMPLETE_PRODUCTS_LOADED,
    products,
  }));

export const createLoadOrders = () => dispatch =>
  Xhr.get('/api/orders').then(orders => dispatch({
    type: ORDERS_LOADED,
    orders,
  }));
