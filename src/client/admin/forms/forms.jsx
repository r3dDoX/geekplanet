import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import ActionTypes from '../../actionTypes';
import ProductService from '../../products/productService';
import ProducerService from '../producers/producerService';
import SupplierService from '../suppliers/supplierService';
import ProductForm from './productForm.jsx';
import ProductCategoryForm from './productCategoryForm.jsx';
import ProducerForm from './producerForm.jsx';
import SupplierForm from './supplierForm.jsx';

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
          <ProductCategoryForm />
        </Tab>
        <Tab label="Suppliers" value="2">
          <SupplierForm />
        </Tab>
        <Tab label="Producers" value="3">
          <ProducerForm />
        </Tab>
      </Tabs>
    );
  }
}

FormsComponent.propTypes = {
  selectedTab: PropTypes.string,
  switchTab: PropTypes.func,
  loadProductCategories: PropTypes.func,
  loadProducers: PropTypes.func,
  loadSuppliers: PropTypes.func,
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
  }),
)(FormsComponent);

export default Forms;
