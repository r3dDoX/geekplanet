import { connect } from 'react-redux';
import ProductForm from './productForm.jsx';
import { SELECT_UPLOAD_FILES } from '../actionTypes';

const ProductContainer = connect(
  state => state.products,
  dispatch => ({
    onSelectFile(selectedFiles) {
      dispatch({
        type: SELECT_UPLOAD_FILES,
        data: selectedFiles,
      });
    },
  }),
)(ProductForm);

export default ProductContainer;
