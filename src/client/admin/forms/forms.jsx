import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ActionTypes from '../../actionTypes';
import ProductService from '../../products/productService';
import ProducerService from '../../producers/producerService';
import SupplierService from '../../suppliers/supplierService';
import UploadImagePreview from './uploadImagePreview.jsx';

const styles = {
  tab: {
    padding: '20px',
  },
  fileUploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  uploadButton: {
    marginTop: '10px',
  },
};

const submitForm = (submitFunction, event) => {
  event.preventDefault();
  const form = event.target;
  return submitFunction(new FormData(form))
    .then(() => form.reset());
};

class FormsComponent extends React.Component {

  componentWillMount() {
    this.props.loadProductCategories();
    this.props.loadProducers();
    this.props.loadSuppliers();
  }

  render() {
    const {
      selectedFiles,
      selectedProductCategory,
      productCategories,
      selectedProducer,
      producers,
      selectedSupplier,
      suppliers,
      onSelectFile,
      selectedTab,
      switchTab,
      loadProductCategories,
      loadProducers,
      loadSuppliers,
      selectProductCategory,
      selectProducer,
      selectSupplier,
    } = this.props;

    return (
      <Tabs
        onChange={switchTab}
        value={selectedTab}
      >
        <Tab label="Products" value="0">
          <Paper style={styles.tab}>
            <form name="products" onSubmit={event => submitForm(ProductService.saveProduct, event)}>
              <TextField floatingLabelText="Name" name="name" type="text" fullWidth />

              <SelectField
                floatingLabelText="Category"
                value={selectedProductCategory}
                onChange={(event, index, value) => selectProductCategory(value)}
                autoWidth
              >
                {productCategories.map(category => (
                  <MenuItem value={category} key={category} primaryText={category} />
                ))}
              </SelectField>

              <TextField
                floatingLabelText="Short Description"
                name="shortDescription"
                type="text"
                multiLine
                rows={3}
                fullWidth
              />

              <TextField
                floatingLabelText="Description"
                name="description"
                type="text"
                multiLine
                rows={5}
                fullWidth
              />

              <TextField
                floatingLabelText="Price"
                name="price"
                type="number"
                step="any"
                fullWidth
              />
              <TextField
                floatingLabelText="Purchase Price"
                name="purchasePrice"
                type="number"
                step="any"
                fullWidth
              />
              <TextField
                floatingLabelText="Purchase Package Size"
                name="purchasePackageSize"
                type="number"
                fullWidth
              />

              <TextField
                floatingLabelText="Stock"
                name="stock"
                defaultValue="0"
                type="number"
                fullWidth
              />

              <TextField
                floatingLabelText="Stock Minimum"
                name="minStock"
                defaultValue="0"
                type="number"
                fullWidth
              />

              <SelectField
                floatingLabelText="Supplier"
                value={(suppliers.find(supplier => supplier._id === selectedSupplier) || {})._id}
                onChange={(event, index, value) => selectSupplier(value)}
                autoWidth
              >
                {suppliers.map(supplier => (
                  <MenuItem value={supplier._id} key={supplier._id} primaryText={supplier.name} />
                ))}
              </SelectField>

              <TextField
                floatingLabelText="Supplier Product Code"
                name="supplierProductCode"
                type="text"
                fullWidth
              />

              <SelectField
                floatingLabelText="Producer"
                value={(producers.find(producer => producer._id === selectedProducer) || {})._id}
                onChange={(event, index, value) => selectProducer(value)}
                autoWidth
              >
                {producers.map(producer => (
                  <MenuItem value={producer._id} key={producer._id} primaryText={producer.name} />
                ))}
              </SelectField>

              <TextField
                floatingLabelText="Remarks"
                name="remarks"
                type="text"
                multiLine
                fullWidth
              />

              <RaisedButton
                label="Choose images"
                labelPosition="before"
                containerElement="label"
                fullWidth
                style={styles.uploadButton}
              >
                <input
                  name="productPictures[]"
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  style={styles.fileUploadInput}
                  onChange={event => onSelectFile(event.target.files)}
                />
              </RaisedButton>
              <UploadImagePreview files={selectedFiles} />
              <RaisedButton label="Save" type="submit" primary />
            </form>
          </Paper>
        </Tab>
        <Tab label="Product Categories" value="1">
          <Paper style={styles.tab}>
            <form
              name="productcategories"
              onSubmit={
                event => submitForm(ProductService.saveProductCategory, event)
                  .then(loadProductCategories)
              }
            >
              <TextField floatingLabelText="Name" name="name" type="text" fullWidth />

              <RaisedButton label="Save" primary type="submit" />
            </form>
          </Paper>
        </Tab>
        <Tab label="Suppliers" value="2">
          <Paper style={styles.tab}>
            <form
              name="suppliers"
              onSubmit={
                event => submitForm(SupplierService.saveSupplier, event)
                  .then(loadSuppliers)
              }
            >
              <TextField floatingLabelText="Name" name="name" type="text" fullWidth />
              <TextField
                floatingLabelText="VAT Number"
                name="vatNumber"
                type="text"
                fullWidth
              />
              <h3>Address</h3>
              <TextField floatingLabelText="Street Name" name="streetName" type="text" fullWidth />
              <TextField
                floatingLabelText="House Number"
                name="houseNumber"
                type="text"
                fullWidth
              />
              <TextField floatingLabelText="ZIP" name="zip" type="number" fullWidth />
              <TextField floatingLabelText="City" name="city" type="city" fullWidth />
              <TextField
                floatingLabelText="Contact Name"
                name="contactName"
                type="text"
                fullWidth
              />
              <TextField
                floatingLabelText="Contact Email"
                name="contactEmail"
                type="email"
                fullWidth
              />
              <TextField
                floatingLabelText="Contact Phone"
                name="contactPhone"
                type="tel"
                fullWidth
              />
              <TextField
                floatingLabelText="Customer Number"
                name="customerNumber"
                type="text"
                fullWidth
              />
              <TextField
                floatingLabelText="Remarks"
                name="remarks"
                type="text"
                multiLine
                fullWidth
              />
              <RaisedButton label="Save" primary type="submit" />
            </form>
          </Paper>
        </Tab>
        <Tab label="Producers" value="3">
          <Paper style={styles.tab}>
            <form
              name="producers"
              onSubmit={
                event => submitForm(ProducerService.saveProducer, event)
                  .then(loadProducers)
              }
            >
              <TextField floatingLabelText="Name" name="name" type="text" fullWidth />
              <TextField
                floatingLabelText="VAT Number"
                name="vatNumber"
                type="text"
                fullWidth
              />
              <h3>Address</h3>
              <TextField floatingLabelText="Street Name" name="streetName" type="text" fullWidth />
              <TextField
                floatingLabelText="House Number"
                name="houseNumber"
                type="text"
                fullWidth
              />
              <TextField floatingLabelText="ZIP" name="zip" type="number" fullWidth />
              <TextField floatingLabelText="City" name="city" type="city" fullWidth />
              <TextField
                floatingLabelText="Contact Name"
                name="contactName"
                type="text"
                fullWidth
              />
              <TextField
                floatingLabelText="Contact Email"
                name="contactEmail"
                type="email"
                fullWidth
              />
              <TextField
                floatingLabelText="Contact Phone"
                name="contactPhone"
                type="tel"
                fullWidth
              />
              <TextField
                floatingLabelText="Remarks"
                name="remarks"
                type="text"
                multiLine
                fullWidth
              />

              <RaisedButton label="Save" primary type="submit" />
            </form>
          </Paper>
        </Tab>
      </Tabs>
    );
  }
}

FormsComponent.propTypes = {
  selectedFiles: PropTypes.instanceOf(FileList),
  selectedProductCategory: PropTypes.string,
  productCategories: PropTypes.arrayOf(PropTypes.string),
  selectedProducer: PropTypes.string,
  producers: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  })),
  selectedSupplier: PropTypes.string,
  suppliers: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  })),
  selectedTab: PropTypes.string,
  switchTab: PropTypes.func,
  onSelectFile: PropTypes.func,
  loadProductCategories: PropTypes.func,
  loadProducers: PropTypes.func,
  loadSuppliers: PropTypes.func,
  selectProductCategory: PropTypes.func,
  selectProducer: PropTypes.func,
  selectSupplier: PropTypes.func,
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
    selectProductCategory(category) {
      dispatch({
        type: ActionTypes.PRODUCT_CATEGORY_SELECTED,
        data: category,
      });
    },
    selectProducer(producerId) {
      dispatch({
        type: ActionTypes.PRODUCER_SELECTED,
        data: producerId,
      });
    },
    selectSupplier(supplierId) {
      dispatch({
        type: ActionTypes.SUPPLIER_SELECTED,
        data: supplierId,
      });
    },
  }),
)(FormsComponent);

export default Forms;
