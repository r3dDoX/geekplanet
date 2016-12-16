import { connect } from 'react-redux';
import Forms from './forms.jsx';
import ActionTypes from '../actionTypes';
import ProductService from '../products/productService';

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
    selectProductCategory(category) {
      dispatch({
        type: ActionTypes.PRODUCT_CATEGORY_SELECTED,
        data: category,
      });
    },
  }),
)(Forms);

export default FormsContainer;
