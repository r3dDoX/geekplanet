import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { FormattedMessage } from 'react-intl';

const styles = {
  container: {
    marginTop: '20px',
  },
};

const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    autoWidth
  >
    {children}
  </SelectField>
);

const renderTextField = ({ input, label, type, min, max, meta: { touched, error } }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    type={type}
    min={min}
    max={max}
    {...input}
  />
);

const UserAddress = () => (
  <div style={styles.container}>
    <form>
      <Field
        component={renderSelectField}
        name="title"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.TITLE" />}
      >
        <MenuItem value={'Frau'} primaryText={<FormattedMessage id="ORDER.ADDRESS.FORM.MRS" />} />
        <MenuItem value={'Herr'} primaryText={<FormattedMessage id="ORDER.ADDRESS.FORM.MR" />} />
      </Field>
      <br />
      <Field
        component={renderTextField}
        name="firstName"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.FIRST_NAME" />}
        type="text"
      />&nbsp;
      <Field
        component={renderTextField}
        name="lastName"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.LAST_NAME" />}
        type="text"
      />
      <br />
      <Field
        component={renderTextField}
        name="address"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.ADDRESS" />}
        type="text"
      />
      <br />
      <Field
        component={renderTextField}
        name="zip"
        min="1000"
        max="9999"
        type="number"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.ZIP" />}
      />&nbsp;
      <Field
        component={renderTextField}
        name="city"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.CITY" />}
        type="text"
      />
    </form>
  </div>
);

export default reduxForm({
  form: 'userAddress',
})(UserAddress);