import { change } from 'redux-form';
import * as ProductService from '../products/productService';
import { formName as productFormName } from './forms/productForm.jsx';
import ProductCategoryService from './productcategories/productCategoryService';
import ProducerService from './producers/producerService';
import SupplierService from './suppliers/supplierService';
import TagService from './tags/tagService';
import Xhr from '../xhr';

export const SELECT_FORMS_TABS = 'SELECT_FORMS_TABS';
export const SELECT_UPLOAD_FILES = 'SELECT_UPLOAD_FILES';
export const REMOVE_SELECTED_FILE = 'REMOVE_SELECTED_FILE';
export const RESET_SELECTED_FILES = 'RESET_SELECTED_FILES';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const PRODUCT_CATEGORIES_LOADED = 'PRODUCT_CATEGORIES_LOADED';
export const PRODUCERS_LOADED = 'PRODUCERS_LOADED';
export const SUPPLIERS_LOADED = 'SUPPLIERS_LOADED';
export const TAGS_LOADED = 'TAGS_LOADED';
export const SET_TAGS = 'SET_TAGS';
export const COMPLETE_PRODUCTS_LOADED = 'COMPLETE_PRODUCTS_LOADED';

export const createSwitchTab = tabIndex => ({
  type: SELECT_FORMS_TABS,
  data: tabIndex,
});

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

export const createLoadProductCategories = () => dispatch =>
  ProductCategoryService.loadProductCategories().then(categories => dispatch({
    type: PRODUCT_CATEGORIES_LOADED,
    data: categories,
  }));

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
