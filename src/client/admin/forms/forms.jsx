import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialize, change } from 'redux-form';
import { Tabs, Tab } from 'material-ui/Tabs';
import ActionTypes from '../../actionTypes';
import ProductService from '../../products/productService';
import ProductCategoryService from '../productcategories/productCategoryService';
import ProducerService from '../producers/producerService';
import SupplierService from '../suppliers/supplierService';
import ProductForm, { formName as productFormName } from './productForm.jsx';
import ProductCategoryForm, {
  formName as productCategoryFormName,
} from './productCategoryForm.jsx';
import ProducerForm, { formName as producerFormName } from './producerForm.jsx';
import SupplierForm, { formName as supplierFormName } from './supplierForm.jsx';
import {
  ProducerPropType,
  SupplierPropType,
  ProductCategoryPropType,
  ProductPropType,
} from './forms.proptypes';

class Forms extends React.Component {

  componentWillMount() {
    this.props.loadProducts();
    this.props.loadProductCategories();
    this.props.loadProducers();
    this.props.loadSuppliers();
  }

  render() {
    const {
      selectedTab,
      switchTab,
      selectFiles,
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
            selectedFiles={selectedFiles}
            productCategories={productCategories}
            producers={producers}
            suppliers={suppliers}
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
};

export default connect(
  state => state.forms,
  dispatch => ({
    switchTab(tabIndex) {
      dispatch({
        type: ActionTypes.SELECT_FORMS_TABS,
        data: tabIndex,
      });
    },
    clearForm(formName) {
      dispatch(initialize(formName));
    },
    selectFiles(selectedFiles, initialFiles) {
      const formData = new FormData();
      for (const file of selectedFiles) {
        formData.append('files[]', file);
      }
      ProductService.savePictures(formData)
        .then((savedFileIds) => {
          dispatch({
            type: ActionTypes.SELECT_UPLOAD_FILES,
            data: savedFileIds,
          });
          dispatch(change(productFormName, 'files', initialFiles.concat(savedFileIds)));
        });
    },
    resetSelectedFiles() {
      dispatch({
        type: ActionTypes.RESET_SELECTED_FILES,
      });
    },
    loadProducts() {
      ProductService.loadProducts().then(products => dispatch({
        type: ActionTypes.PRODUCTS_LOADED,
        data: products,
      }));
    },
    selectProduct: (product) => {
      dispatch({
        type: ActionTypes.SELECT_PRODUCT,
        data: product,
      });
      dispatch(initialize(productFormName, product));
    },
    selectProductCategory: productCategory =>
      dispatch(initialize(productCategoryFormName, productCategory)),
    loadProductCategories() {
      ProductCategoryService.loadProductCategories().then(categories => dispatch({
        type: ActionTypes.PRODUCT_CATEGORIES_LOADED,
        data: categories,
      }));
    },
    selectProducer: producer =>
      dispatch(initialize(producerFormName, producer)),
    loadProducers() {
      ProducerService.loadProducers().then(producers => dispatch({
        type: ActionTypes.PRODUCERS_LOADED,
        data: producers,
      }));
    },
    selectSupplier: (supplier) =>
      dispatch(initialize(supplierFormName, supplier)),
    loadSuppliers() {
      SupplierService.loadSuppliers().then(suppliers => dispatch({
        type: ActionTypes.SUPPLIERS_LOADED,
        data: suppliers,
      }));
    },
  }),
)(Forms);
