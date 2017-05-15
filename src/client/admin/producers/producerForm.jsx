import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import TextField from '../../formHelpers/textField.jsx';
import SelectField from '../../formHelpers/selectField.jsx';
import { ProducerPropType } from '../../propTypes';

export const formName = 'producer';

const styles = {
  container: {
    padding: '24px',
  },
};

const ProducerForm = ({
  handleSubmit,
  onSubmit,
  producers,
  selectProducer,
}) => (
  <form
    style={styles.container}
    name={formName}
    onSubmit={handleSubmit(onSubmit)}
  >
    <Field
      component={SelectField}
      name="_id"
      onChange={(event, value) => selectProducer(value)}
    >
      <MenuItem
        value=""
        primaryText="Create new"
      />
      <Divider />
      {producers.map(({ _id, name }) => (
        <MenuItem
          key={_id}
          value={_id}
          primaryText={name}
        />
      ))}
    </Field>
    <br />
    <Field
      component={TextField}
      name="name"
      label="Name"
      type="text"
    />&nbsp;
    <Field
      component={TextField}
      name="vatNumber"
      label="VAT Number"
      type="text"
    />
    <h3>Address</h3>
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
    />&nbsp;
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
    <h3>Contact</h3>
    <Field
      component={TextField}
      name="contactName"
      label="Contact Name"
      type="text"
    />&nbsp;
    <Field
      component={TextField}
      name="contactEmail"
      label="Contact Email"
      type="email"
    />&nbsp;
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
      multiLine
    />
    <br />
    <RaisedButton label="Save" primary type="submit" />
  </form>
);

ProducerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectProducer: PropTypes.func.isRequired,
  producers: PropTypes.arrayOf(ProducerPropType).isRequired,
};

export default reduxForm({
  form: formName,
  destroyOnUnmount: false,
})(ProducerForm);
