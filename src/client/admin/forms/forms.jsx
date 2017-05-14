import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { Tabs, Tab } from 'material-ui/Tabs';
import ProductService from '../../products/productService';
import ProductCategoryService from '../productcategories/productCategoryService';
import ProducerService from '../producers/producerService';
import SupplierService from '../suppliers/supplierService';
import ProductForm, { formName as productFormName } from './productForm.jsx';
import ProductCategoryForm, {
  formName as productCategoryFormName,
} from '../productcategories/productCategoryForm.jsx';
import ProducerForm, { formName as producerFormName } from '../producers/producerForm.jsx';
import SupplierForm, { formName as supplierFormName } from '../suppliers/supplierForm.jsx';
import {
  ProducerPropType,
  SupplierPropType,
  ProductCategoryPropType,
  ProductPropType,
} from '../../propTypes';
import {
  createLoadProducers,
  createLoadProductCategories,
  createLoadSuppliers,
  createLoadTags,
  createRemoveFile, createRemoveTag,
  createResetSelectedFiles,
  createSelectFiles,
  createSelectProduct, createSelectTag,
  createSwitchTab,
} from '../adminActions';
import { createLoadProducts } from '../../actions';

class Forms extends React.Component {

  componentWillMount() {
    this.props.loadProducts();
    this.props.loadProductCategories();
    this.props.loadProducers();
    this.props.loadSuppliers();
    this.props.loadTags();
  }

  render() {
    const {
      selectedTab,
      switchTab,
      selectFiles,
      removeFile,
      resetSelectedFiles,
      selectedFiles,
      products,
      selectProduct,
      loadProducts,
      productCategories,
      selectProductCategory,
      loadProductCategories,
      producers,
      suppliers,
      clearForm,
      selectProducer,
      selectSupplier,
      loadProducers,
      loadSuppliers,
      tags,
      savedTags,
      selectTag,
      removeTag,
    } = this.props;

    return (
      <Tabs
        onChange={switchTab}
        value={selectedTab}
      >
        <Tab label="Products" value="0">
          <ProductForm
            products={products}
            selectProduct={productId => selectProduct(
              products.find(product => product._id === productId)
            )}
            selectFiles={uploadFiles => selectFiles(uploadFiles, selectedFiles)}
            removeFile={removeFile}
            selectedFiles={selectedFiles}
            productCategories={productCategories}
            producers={producers}
            suppliers={suppliers}
            tags={tags}
            savedTags={savedTags}
            selectTag={selectTag}
            removeTag={removeTag}
            onSubmit={
              product => ProductService.saveProduct(product)
                .then(loadProducts)
                .then(() => {
                  clearForm(productFormName);
                  resetSelectedFiles();
                })
            }
          />
        </Tab>
        <Tab label="Product Categories" value="1">
          <ProductCategoryForm
            selectProductCategory={productCategoryId => selectProductCategory(
              productCategories
                .find(productCategory => productCategory._id === productCategoryId)
            )}
            productCategories={productCategories}
            onSubmit={
              productCategory => ProductCategoryService.saveProductCategory(productCategory)
                .then(loadProductCategories)
                .then(() => clearForm(productCategoryFormName))
            }
          />
        </Tab>
        <Tab label="Suppliers" value="2">
          <SupplierForm
            selectSupplier={supplierId => selectSupplier(
              suppliers.find(supplier => supplier._id === supplierId)
            )}
            suppliers={suppliers}
            onSubmit={
              supplier => SupplierService.saveSupplier(supplier)
                .then(loadSuppliers)
                .then(() => clearForm(supplierFormName))
            }
          />
        </Tab>
        <Tab label="Producers" value="3">
          <ProducerForm
            selectProducer={producerId => selectProducer(
              producers.find(producer => producer._id === producerId)
            )}
            producers={producers}
            onSubmit={
              producer => ProducerService.saveProducer(producer)
                .then(loadProducers)
                .then(() => clearForm(producerFormName))
            }
          />
        </Tab>
      </Tabs>
    );
  }
}

Forms.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
  selectFiles: PropTypes.func.isRequired,
  removeFile: PropTypes.func.isRequired,
  resetSelectedFiles: PropTypes.func.isRequired,
  selectedFiles: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectProduct: PropTypes.func.isRequired,
  loadProducts: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  selectProductCategory: PropTypes.func.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  producers: PropTypes.arrayOf(ProducerPropType).isRequired,
  selectProducer: PropTypes.func.isRequired,
  loadProducers: PropTypes.func.isRequired,
  suppliers: PropTypes.arrayOf(SupplierPropType).isRequired,
  selectSupplier: PropTypes.func.isRequired,
  loadSuppliers: PropTypes.func.isRequired,
  savedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadTags: PropTypes.func.isRequired,
  selectTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
};

export default connect(
  state => state.forms,
  dispatch => ({
    switchTab(tabIndex) {
      dispatch(createSwitchTab(tabIndex));
    },
    clearForm(formName) {
      dispatch(initialize(formName));
    },
    selectFiles(selectedFiles, initialFiles) {
      dispatch(createSelectFiles(selectedFiles, initialFiles));
    },
    removeFile(initialFiles, fileIdToRemove) {
      dispatch(createRemoveFile(initialFiles, fileIdToRemove));
    },
    resetSelectedFiles() {
      dispatch(createResetSelectedFiles());
    },
    loadProducts() {
      dispatch(createLoadProducts());
    },
    selectProduct: (product) => {
      dispatch(createSelectProduct(product));
      dispatch(initialize(productFormName, product));
    },
    selectProductCategory: productCategory =>
      dispatch(initialize(productCategoryFormName, productCategory)),
    loadProductCategories() {
      dispatch(createLoadProductCategories());
    },
    selectProducer: producer => dispatch(initialize(producerFormName, producer)),
    loadProducers() {
      dispatch(createLoadProducers());
    },
    selectSupplier: supplier => dispatch(initialize(supplierFormName, supplier)),
    loadSuppliers() {
      dispatch(createLoadSuppliers());
    },
    loadTags() {
      dispatch(createLoadTags());
    },
    selectTag(tags, item, index) {
      dispatch(createSelectTag(tags, item, index));
    },
    removeTag(tags, tag) {
      dispatch(createRemoveTag(tags, tag));
    },
  }),
)(Forms);
