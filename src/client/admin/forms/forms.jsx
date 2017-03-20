import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { Tabs, Tab } from 'material-ui/Tabs';
import ActionTypes from '../../actionTypes';
import ProductService from '../../products/productService';
import ProducerService from '../producers/producerService';
import SupplierService from '../suppliers/supplierService';
import ProductForm from './productForm.jsx';
import ProductCategoryForm, {
  formName as productCategoryFormName,
}  from './productCategoryForm.jsx';
import ProducerForm, { formName as producerFormName } from './producerForm.jsx';
import SupplierForm, { formName as supplierFormName } from './supplierForm.jsx';
import {
  ProducerPropType,
  SupplierPropType,
  ProductCategoryPropType
} from './forms.proptypes';
import ProductCategoryService from '../productcategories/productCategoryService';

class FormsComponent extends React.Component {

  componentWillMount() {
    this.props.loadProductCategories();
    this.props.loadProducers();
    this.props.loadSuppliers();
  }

  render() {
    const {
      selectedTab,
      switchTab,
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
          <ProductForm />
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

FormsComponent.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
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

const Forms = connect(
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
    selectProductCategory: (productCategory) => {
      dispatch({
        type: ActionTypes.SELECT_PRODUCT_CATEGORY,
        data: productCategory,
      });
      dispatch(initialize(productCategoryFormName, productCategory));
    },
    loadProductCategories() {
      ProductService.loadProductCategories().then(categories => dispatch({
        type: ActionTypes.PRODUCT_CATEGORIES_LOADED,
        data: categories,
      }));
    },
    selectProducer: (producer) => {
      dispatch({
        type: ActionTypes.SELECT_PRODUCER,
        data: producer,
      });
      dispatch(initialize(producerFormName, producer));
    },
    loadProducers() {
      ProducerService.loadProducers().then(producers => dispatch({
        type: ActionTypes.PRODUCERS_LOADED,
        data: producers,
      }));
    },
    selectSupplier: (supplier) => {
      dispatch({
        type: ActionTypes.SELECT_SUPPLIER,
        data: supplier,
      });
      dispatch(initialize(supplierFormName, supplier));
    },
    loadSuppliers() {
      SupplierService.loadSuppliers().then(suppliers => dispatch({
        type: ActionTypes.SUPPLIERS_LOADED,
        data: suppliers,
      }));
    },
  }),
)(FormsComponent);

export default Forms;
