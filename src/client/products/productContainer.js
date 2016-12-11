import { connect } from 'react-redux';
import ProductForm from './productForm.jsx';
import ActionTypes from '../actionTypes';

const ProductContainer = connect(
  state => state.products,
  dispatch => ({
    onSelectFile(selectedFiles) {
      dispatch({
        type: ActionTypes.SELECT_UPLOAD_FILES,
        data: selectedFiles,
      });
    },
  }),
)(ProductForm);

export default ProductContainer;
