import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import AutoCompleteField from '../../formHelpers/autoCompleteField.jsx';
import TextField from '../../formHelpers/textField.jsx';
import { ProductCategoryPropType, ProductPropType } from '../../propTypes';
import PictureField from './pictureField.jsx';

export const formName = 'homeTiles';

const HomeTileDialog = ({
  products,
  productCategories,
  selectedCategory,
  handleSubmit,
}) => (
  <Dialog
    modal
    open
  >
    <form
      name={formName}
      onSubmit={handleSubmit((...args) => console.log(args))}
    >
      <Field
        component={AutoCompleteField}
        name="category"
        label="Product Category"
        dataSource={productCategories.map(category => ({
          id: category._id,
          name: category.de.name,
        }))}
        dataSourceConfig={{ text: 'name', value: 'id' }}
        filter={AutoComplete.caseInsensitiveFilter}
      />
      <br />
      <Field
        component={TextField}
        name="de.name"
        label="Title"
        type="text"
      />
      <br />
      <Field
        component={PictureField}
        name="picture"
        label="Picture"
        pictures={selectedCategory ?
          products
            .filter(product => product.category === selectedCategory)
            .map(product => product.files[0])
            .filter(picture => !!picture)
          : []}
      />
      <br />
      <RaisedButton
        label="Submit"
        type="submit"
        primary
      />
    </form>
  </Dialog>
);

HomeTileDialog.propTypes = {
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: formName,
})(HomeTileDialog);
