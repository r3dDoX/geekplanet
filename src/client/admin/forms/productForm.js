import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import MaterialTextField from '@material-ui/core/TextField';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDrafts from 'react-drafts';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withRouter from 'react-router-dom/withRouter';
import { change, Field, FieldArray, initialize, reduxForm } from 'redux-form';
import styled from 'styled-components';
import '../../../../node_modules/react-drafts/dist/react-drafts.css';
import { createLoadProducts } from '../../actions';
import SelectField from '../../formHelpers/selectField';
import TextField from '../../formHelpers/textField';
import { required } from '../../formHelpers/validations';
import MainSpinner from '../../layout/mainSpinner';
import * as ProductService from '../../products/productService';
import {
  ProducerPropType,
  ProductCategoryPropType,
  ProductPropType,
  SupplierPropType,
  TagPropType,
} from '../../propTypes';
import {
  createLoadCompleteProducts,
  createLoadProducers,
  createLoadSuppliers,
  createLoadTags,
  createRemoveFile,
  createRemoveTag,
  createResetSelectedFiles,
  createSelectFiles,
  createSelectProduct,
  createSelectTag,
  productFormName,
} from '../adminActions';
import TagSelector from '../tags/tagSelector';
import LinkArray from './linkArray';
import TextAreaArray from './textAreaArray';
import UploadImagePreview from './uploadImagePreview';

const grey500 = grey['500'];

const Container = styled.form`
  padding: 24px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DescriptionPart = styled.div`
  flex: 1 1 33.33%;
  min-width: 300px;
`;

const DescriptionPartTitle = styled.h4`
  color: ${grey500};
`;

const FileUploadInput = styled.input`
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  opacity: 0;
`;

const UploadButton = styled(Button)`
  margin-top: 10px !important;
`;

const StyledButton = styled(Button)`
  margin-left: 10px !important;
`;

const styles = {
  selectFields: {
    verticalAlign: 'bottom',
  },
  descriptionEditor: {
    borderBottom: `1px solid ${grey500}`,
  },
};

class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.downshiftInstance = React.createRef();
  }

  componentDidMount() {
    const {
      products,
      selectProduct,
      match,
    } = this.props;

    if (match.params.id) {
      selectProduct(products.find(product => product._id === match.params.id));
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.match.params.id && !nextProps.match.params.id) {
      this.props.clearForm();
    }
  }

  renderDraftJs({ input }) {
    return (
      <ReactDrafts
        content={input.value}
        onFileUpload={() => {}}
        exportTo="html"
        placeholder="Description"
        onBlur={() => this.editor.save().then(content => this.props.changeDescription(content))}
        ref={(editor) => { this.editor = editor; }}
      />
    );
  }

  render() {
    const {
      handleSubmit,
      onSubmit,
      products,
      selectProduct,
      suppliers,
      producers,
      productCategories,
      selectedFiles,
      selectFiles,
      removeFile,
      removeProduct,
      tags,
      savedTags,
      selectTag,
      removeTag,
      match,
      history,
    } = this.props;

    if (!products.length) {
      return <MainSpinner />;
    }

    return (
      <Container
        name={productFormName}
        onSubmit={handleSubmit(onSubmit(history))}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            event.preventDefault();
            return false;
          }
          return true;
        }}
      >
        <Downshift
          onSelect={(selectedProduct) => {
            if (selectedProduct) {
              selectProduct(selectedProduct);
              history.push(`/admin/forms/products/${selectedProduct._id}`);
            }
          }}
          itemToString={product => (product ? product.de.name : '')}
          ref={this.downshiftInstance}
        >
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div style={{ display: 'inline-block' }}>
              <MaterialTextField
                InputProps={{
                  ...getInputProps({
                    placeholder: 'Create New',
                    id: 'select-product',
                  }),
                }}
              />
              {isOpen ? (
                <Paper square>
                  {products
                    .filter(({ de: { name } }) => name.toLowerCase().includes(inputValue.toLowerCase()))
                    .slice(0, 20)
                    .map((product, index) => (
                      <MenuItem
                        {...getItemProps({ item: product })}
                        key={product.de.name}
                        selected={highlightedIndex === index}
                        component="div"
                      >
                        {product.de.name}
                      </MenuItem>
                    ))
                  }
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
        {match.params.id && [
          <StyledButton
            key="deleteProduct"
            variant="contained"
            color="secondary"
            onClick={() => removeProduct(match.params.id).then(() => history.push('/admin/forms/products'))}
          >
            Remove
          </StyledButton>,
          <StyledButton
            key="createNewProduct"
            variant="contained"
            component={Link}
            to="/admin/forms/products"
            onClick={() => this.downshiftInstance.current.clearSelection()}
          >
            Create New
          </StyledButton>,
        ]}
        <br />

        <Field
          component={TextField}
          name="number"
          label="Number"
          type="number"
        />
&nbsp;
        <Field
          component={TextField}
          name="de.name"
          label="Name"
          type="text"
          validate={required}
        />
&nbsp;
        <Field
          component={SelectField}
          name="category"
          label="Product Category"
          style={styles.selectFields}
        >
          {productCategories.map(category => (
            <MenuItem
              key={category._id}
              value={category._id}
            >
              {category.de.name}
            </MenuItem>
          ))}
        </Field>
        <br />
        <TagSelector
          savedTags={savedTags}
          tags={tags}
          selectTag={selectTag}
          removeTag={removeTag}
        />
        <br />
        <Field
          component={TextField}
          name="de.shortDescription"
          label="Short Description"
          type="text"
          multiline
          fullWidth
          rows={3}
        />
        <br />
        <Field
          component={(...args) => this.renderDraftJs(...args)}
          name="de.description"
        />
        <Divider />
        <DescriptionContainer>
          <DescriptionPart>
            <DescriptionPartTitle>
Specifications
            </DescriptionPartTitle>
            <FieldArray
              name="de.specifications"
              component={TextAreaArray}
            />
          </DescriptionPart>
          <DescriptionPart>
            <DescriptionPartTitle>
Delivery
            </DescriptionPartTitle>
            <FieldArray
              name="de.delivery"
              component={TextAreaArray}
            />
          </DescriptionPart>
          <DescriptionPart>
            <DescriptionPartTitle>
Downloads
            </DescriptionPartTitle>
            <FieldArray
              name="de.downloads"
              component={LinkArray}
            />
          </DescriptionPart>
        </DescriptionContainer>
        <Field
          component={TextField}
          name="price"
          label="Price"
          type="number"
          step="any"
        />
&nbsp;
        <Field
          component={TextField}
          name="originalPrice"
          label="Original Price"
          type="number"
          step="any"
        />
&nbsp;
        <Field
          component={TextField}
          name="purchasePrice"
          label="Purchase Price"
          type="number"
          step="any"
        />
&nbsp;
        <Field
          component={TextField}
          name="purchasePackageSize"
          label="Purchase Package Size"
          type="number"
        />
        <br />
        <Field
          component={TextField}
          name="stock"
          label="Stock"
          type="number"
        />
&nbsp;
        <Field
          component={TextField}
          name="minStock"
          label="Stock Minimum"
          type="number"
        />
        <br />
        <Field
          component={SelectField}
          name="supplier"
          label="Supplier"
          style={styles.selectFields}
        >
          {suppliers.map(({ _id, name }) => (
            <MenuItem
              key={_id}
              value={_id}
            >
              {name}
            </MenuItem>
          ))}
        </Field>
&nbsp;
        <Field
          component={TextField}
          name="supplierProductCode"
          label="Supplier Product Code"
          type="text"
        />
        <br />
        <Field
          component={SelectField}
          name="producer"
          label="Producer"
        >
          {producers.map(({ _id, name }) => (
            <MenuItem
              key={_id}
              value={_id}
            >
              {name}
            </MenuItem>
          ))}
        </Field>
        <br />
        <Field
          component={TextField}
          name="remarks"
          label="Remarks"
          type="text"
          multiline
        />
        <br />
        <label htmlFor="productPictureUpload">
          <UploadButton variant="contained">
            Choose images
            <FileUploadInput
              id="productPictureUpload"
              type="file"
              accept="image/jpeg,image/png"
              multiple
              onChange={event => selectFiles(event.target.files, selectedFiles)}
            />
          </UploadButton>
        </label>
        <UploadImagePreview files={selectedFiles} removeFile={removeFile} />
        <Button variant="contained" type="submit" color="primary">
          Save
        </Button>
      </Container>
    );
  }
}

ProductForm.propTypes = {
  clearForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  producers: PropTypes.arrayOf(ProducerPropType).isRequired,
  suppliers: PropTypes.arrayOf(SupplierPropType).isRequired,
  selectedFiles: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectFiles: PropTypes.func.isRequired,
  removeFile: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
  selectProduct: PropTypes.func.isRequired,
  savedTags: PropTypes.arrayOf(TagPropType).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  state => state.forms,
  (dispatch) => {
    function loadProducts() {
      dispatch(createLoadProducts());
      dispatch(createLoadCompleteProducts());
    }

    function clearForm() {
      dispatch(initialize(productFormName));
      dispatch(createResetSelectedFiles());
    }

    return {
      clearForm,
      changeDescription(content) {
        dispatch(change(productFormName, 'de.description', content));
      },
      onSubmit(history) {
        return productToSubmit => ProductService
          .saveProduct(productToSubmit)
          .then(loadProducts)
          .then(() => {
            clearForm();
            history.push('/admin/forms/products');
          });
      },
      selectFiles(selectedFiles, initialFiles) {
        dispatch(createSelectFiles(selectedFiles, initialFiles));
      },
      removeFile(initialFiles, fileIdToRemove) {
        dispatch(createRemoveFile(initialFiles, fileIdToRemove));
      },
      loadProducts,
      selectProduct(product) {
        dispatch(createSelectProduct(product));
        dispatch(initialize(productFormName, product));
      },
      loadProducers() {
        dispatch(createLoadProducers());
      },
      loadSuppliers() {
        dispatch(createLoadSuppliers());
      },
      loadTags() {
        dispatch(createLoadTags());
      },
      selectTag(tags, item) {
        dispatch(createSelectTag(tags, item));
      },
      removeTag(tags, tag) {
        dispatch(createRemoveTag(tags, tag));
      },
      removeProduct(productId) {
        return ProductService.removeProduct(productId)
          .then(loadProducts);
      },
    };
  },
)(reduxForm({
  form: productFormName,
  destroyOnUnmount: false,
})(withRouter(ProductForm)));
