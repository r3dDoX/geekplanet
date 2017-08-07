import { Tab, Tabs } from 'material-ui/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PrivateRoute from '../../router/privateRoute.jsx';
import {
  createLoadCompleteProducts,
  createLoadProducers,
  createLoadProductCategories,
  createLoadSuppliers,
  createLoadTags,
} from '../adminActions';
import ProducerForm from '../producers/producerForm.jsx';
import ProductCategoryForm from '../productcategories/productCategoryForm.jsx';
import SupplierForm from '../suppliers/supplierForm.jsx';
import ProductForm from './productForm.jsx';
import MainSpinner from '../../layout/mainSpinner.jsx';
import { ProductPropType } from '../../propTypes';

const paths = [
  '/forms/products',
  '/forms/productcategories',
  '/forms/suppliers',
  '/forms/producers',
];
const allowedRoles = ['admin'];

class Forms extends React.Component {
  componentWillMount() {
    this.props.loadProducts();
    this.props.loadProductCategories();
    this.props.loadProducers();
    this.props.loadSuppliers();
    this.props.loadTags();
  }

  render() {
    if (this.props.location.pathname === '/forms') {
      return (
        <Redirect to={{
          pathname: paths[0],
        }}
        />
      );
    }

    return (
      <Tabs
        onChange={path => this.props.history.push(path)}
        value={paths.find(path => this.props.location.pathname === path)}
      >
        <Tab label="Products" value={paths[0]}>
          {this.props.products.length ? (
            <PrivateRoute
              path={`${paths[0]}/:id?`}
              allowedRoles={allowedRoles}
              component={ProductForm}
            />
          ) : <MainSpinner />}
        </Tab>
        <Tab label="Product Categories" value={paths[1]}>
          <PrivateRoute
            path={paths[1]}
            allowedRoles={allowedRoles}
            component={ProductCategoryForm}
          />
        </Tab>
        <Tab label="Suppliers" value={paths[2]}>
          <PrivateRoute
            path={paths[2]}
            allowedRoles={allowedRoles}
            component={SupplierForm}
          />
        </Tab>
        <Tab label="Producers" value={paths[3]}>
          <PrivateRoute
            path={paths[3]}
            allowedRoles={allowedRoles}
            component={ProducerForm}
          />
        </Tab>
      </Tabs>
    );
  }
}

Forms.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  loadProducers: PropTypes.func.isRequired,
  loadSuppliers: PropTypes.func.isRequired,
  loadTags: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  state => state.forms,
  dispatch => ({
    loadProducts() {
      dispatch(createLoadCompleteProducts());
    },
    loadProductCategories() {
      dispatch(createLoadProductCategories());
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
  }),
)(withRouter(Forms));
