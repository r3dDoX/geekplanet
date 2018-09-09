import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import actions from 'redux-form/es/actions';
import SelectField from '../../formHelpers/selectField';
import TextField from '../../formHelpers/textField';
import { SupplierPropType } from '../../propTypes';
import { createLoadSuppliers } from '../adminActions';
import SupplierService from './supplierService';

const { initialize } = actions;
const formName = 'supplier';

const styles = {
  container: {
    padding: '24px',
  },
};

const SupplierForm = ({
  handleSubmit,
  onSubmit,
  suppliers,
  selectSupplier,
}) => (
  <form
    style={styles.container}
    name={formName}
    onSubmit={handleSubmit(onSubmit)}
  >
    <Field
      component={SelectField}
      name="_id"
      onChange={(event, value) => selectSupplier(
        suppliers.find(supplier => supplier._id === value)
      )}
      label="Create new"
    >
      <MenuItem value="">
        Create new
      </MenuItem>
      <Divider />
      {suppliers.map(({ _id, name }) => (
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
      name="name"
      label="Name"
      type="text"
    />
&nbsp;
    <Field
      component={TextField}
      name="vatNumber"
      label="VAT Number"
      type="text"
    />
&nbsp;
    <Field
      component={TextField}
      name="customerNumber"
      label="Customer Number"
      type="text"
    />
    <h3>
Address
    </h3>
    <Field
      component={TextField}
      name="address.streetAddress"
      label="Street address"
      type="text"
    />
    <br />
    <Field
      component={TextField}
      name="address.zip"
      label="Zip"
      type="number"
    />
&nbsp;
    <Field
      component={TextField}
      name="address.city"
      label="City"
      type="text"
    />
    <br />
    <Field
      component={TextField}
      name="address.country"
      label="Country"
      type="text"
    />
    <h3>
Bank
    </h3>
    <Field
      component={TextField}
      name="bank"
      label="Bank"
      type="text"
    />
&nbsp;
    <Field
      component={TextField}
      name="iban"
      label="IBAN"
      type="text"
    />
&nbsp;
    <Field
      component={TextField}
      name="bic"
      label="BIC"
      type="text"
    />
    <br />
    <Field
      component={TextField}
      name="bankRemarks"
      label="Remarks"
      type="text"
      multiline
    />
    <h3>
Contact
    </h3>
    <Field
      component={TextField}
      name="contactName"
      label="Contact Name"
      type="text"
    />
&nbsp;
    <Field
      component={TextField}
      name="contactEmail"
      label="Contact Email"
      type="email"
    />
&nbsp;
    <Field
      component={TextField}
      name="contactPhone"
      label="Contact Phone"
      type="tel"
    />
    <br />
    <Field
      component={TextField}
      name="remarks"
      label="Remarks"
      type="text"
      multiline
    />
    <br />
    <Button variant="contained" color="primary" type="submit">
      Save
    </Button>
  </form>
);

SupplierForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectSupplier: PropTypes.func.isRequired,
  suppliers: PropTypes.arrayOf(SupplierPropType).isRequired,
};

export default connect(
  state => state.forms,
  (dispatch) => {
    function clearForm() {
      dispatch(initialize(formName));
    }

    function loadSuppliers() {
      dispatch(createLoadSuppliers());
    }

    return {
      selectSupplier(supplier) {
        dispatch(initialize(formName, supplier));
      },
      onSubmit(supplier) {
        SupplierService.saveSupplier(supplier)
          .then(loadSuppliers)
          .then(clearForm);
      },
    };
  }
)(reduxForm({
  form: formName,
  destroyOnUnmount: false,
})(SupplierForm));
