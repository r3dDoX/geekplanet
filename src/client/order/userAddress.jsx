import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import SelectField from '../formHelpers/selectField.jsx';
import TextField from '../formHelpers/textField.jsx';
import { required, requiredZIP } from '../formHelpers/validations.jsx';

export const formName = 'userAddress';

const styles = {
  container: {
    marginTop: '20px',
  },
  idField: {
    display: 'none',
  },
  submitButton: {
    marginTop: '20px',
  },
};

const UserAddress = ({ handleSubmit, onSubmit }) => (
  <div style={styles.container}>
    <form name={formName} onSubmit={handleSubmit(onSubmit)}>
      <Field
        component={TextField}
        name="_id"
        type="text"
        style={styles.idField}
      />
      <Field
        component={SelectField}
        name="title"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.TITLE" />}
        validate={required}
      >
        <MenuItem value="Frau" primaryText={<FormattedMessage id="ORDER.ADDRESS.FORM.MRS" />} />
        <MenuItem value="Herr" primaryText={<FormattedMessage id="ORDER.ADDRESS.FORM.MR" />} />
      </Field>
      <br />
      <Field
        component={TextField}
        name="firstName"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.FIRST_NAME" />}
        type="text"
        validate={required}
        autoComplete="shipping given-name"
      />
      &nbsp;
      <Field
        component={TextField}
        name="lastName"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.LAST_NAME" />}
        type="text"
        validate={required}
        autoComplete="shipping family-name"
      />
      <br />
      <Field
        component={TextField}
        name="streetAddress"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.STREET_ADDRESS" />}
        type="text"
        validate={required}
        autoComplete="shipping street-address"
      />
      <br />
      <Field
        component={TextField}
        name="zip"
        min="1000"
        max="9999"
        type="number"
        validate={requiredZIP}
        autoComplete="shipping postal-code"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.ZIP" />}
      />
&nbsp;
      <Field
        component={TextField}
        name="city"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.CITY" />}
        type="text"
        validate={required}
        autoComplete="shipping address-level2"
      />
      <br />
      <Field
        component={SelectField}
        name="country"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.COUNTRY" />}
        validate={required}
      >
        <MenuItem value="Schweiz" primaryText={<FormattedMessage id="COUNTRIES.CHE" />} />
        <MenuItem value="Liechtenstein" primaryText={<FormattedMessage id="COUNTRIES.LIE" />} />
      </Field>
      <br />
      <Button
        color="primary"
        variant="contained"
        style={styles.submitButton}
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.NEXT" />}
        type="submit"
      />
    </form>
  </div>
);

UserAddress.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: formName,
  destroyOnUnmount: false,
})(UserAddress);
