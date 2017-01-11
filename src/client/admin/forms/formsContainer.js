import { connect } from 'react-redux';
import Forms from './formsOld.jsx';
import ActionTypes from '../../actionTypes';
import ProductService from '../../products/productService';
import ProducerService from '../../producers/producerService';
import SupplierService from '../../suppliers/supplierService';

const FormsContainer = connect(
  state => state.forms,
  dispatch => ({
    onSelectFile(selectedFiles) {
      dispatch({
        type: ActionTypes.SELECT_UPLOAD_FILES,
        data: selectedFiles,
      });
    },
    loadProductCategories() {
      ProductService.loadProductCategories().then(categories => dispatch({
        type: ActionTypes.PRODUCT_CATEGORIES_LOADED,
        data: categories,
      }));
    },
    loadProducers() {
      ProducerService.loadProducers().then(categories => dispatch({
        type: ActionTypes.PRODUCERS_LOADED,
        data: categories,
      }));
    },
    loadSuppliers() {
      SupplierService.loadSuppliers().then(categories => dispatch({
        type: ActionTypes.SUPPLIERS_LOADED,
        data: categories,
      }));
    },
    selectProductCategory(category) {
      dispatch({
        type: ActionTypes.PRODUCT_CATEGORY_SELECTED,
        data: category,
      });
    },
    selectProducer(producerId) {
      dispatch({
        type: ActionTypes.PRODUCER_SELECTED,
        data: producerId,
      });
    },
    selectSupplier(supplierId) {
      dispatch({
        type: ActionTypes.SUPPLIER_SELECTED,
        data: supplierId,
      });
    },
  }),
)(Forms);

export default FormsContainer;
