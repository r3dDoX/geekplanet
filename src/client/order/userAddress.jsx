import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from './selectField.jsx';
import TextField from './textField.jsx';

const formName = 'userAddress';

const styles = {
  container: {
    marginTop: '20px',
  },
  submitButton: {
    marginTop: '20px',
  },
};

const required = (value) => {
  if (!(value && value.length >= 1)) {
    return <FormattedMessage id="ORDER.ADDRESS.FORM.REQUIRED" />;
  }

  return null;
};

const requiredZIP = (value) => {
  if (!(value && Number(value) >= 1000 && Number(value) < 10000)) {
    return <FormattedMessage id="ORDER.ADDRESS.FORM.REQUIRED_ZIP" />;
  }

  return null;
};

const UserAddress = ({ handleSubmit, onSubmit }) => (
  <div style={styles.container}>
    <form name={formName} onSubmit={handleSubmit(onSubmit)}>
      <Field
        component={SelectField}
        name="title"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.TITLE" />}
      >
        <MenuItem value={'Frau'} primaryText={<FormattedMessage id="ORDER.ADDRESS.FORM.MRS" />} />
        <MenuItem value={'Herr'} primaryText={<FormattedMessage id="ORDER.ADDRESS.FORM.MR" />} />
      </Field>
      <br />
      <Field
        component={TextField}
        name="firstName"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.FIRST_NAME" />}
        type="text"
        validate={[required]}
      />&nbsp;
      <Field
        component={TextField}
        name="lastName"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.LAST_NAME" />}
        type="text"
        validate={[required]}
      />
      <br />
      <Field
        component={TextField}
        name="streetName"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.STREET_NAME" />}
        type="text"
        validate={[required]}
      />&nbsp;
      <Field
        component={TextField}
        name="streetNumber"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.STREET_NUMBER" />}
        type="number"
        validate={[required]}
      />
      <br />
      <Field
        component={TextField}
        name="zip"
        min="1000"
        max="9999"
        type="number"
        validate={[requiredZIP]}
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.ZIP" />}
      />&nbsp;
      <Field
        component={TextField}
        name="city"
        label={<FormattedMessage id="ORDER.ADDRESS.FORM.CITY" />}
        type="text"
        validate={[required]}
      />
      <br />
      <RaisedButton
        primary
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
