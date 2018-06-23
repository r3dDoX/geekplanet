import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { initialize, Field, reduxForm } from 'redux-form';
import SelectField from '../../formHelpers/selectField.jsx';
import TextField from '../../formHelpers/textField.jsx';
import { ProducerPropType } from '../../propTypes';
import { createLoadProducers } from '../adminActions';
import ProducerService from './producerService';

const formName = 'producer';

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
      onChange={(event, value) => selectProducer(
        producers.find(producer => producer._id === value)
      )}
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
    />
&nbsp;
    <Field
      component={TextField}
      name="vatNumber"
      label="VAT Number"
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
      multiLine
    />
    <br />
    <Button variant="contained" label="Save" color="primary" type="submit" />
  </form>
);

ProducerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectProducer: PropTypes.func.isRequired,
  producers: PropTypes.arrayOf(ProducerPropType).isRequired,
};

export default connect(
  state => state.forms,
  (dispatch) => {
    function clearForm() {
      dispatch(initialize(formName));
    }

    function loadProducers() {
      dispatch(createLoadProducers());
    }

    return {
      selectProducer(producer) {
        dispatch(initialize(formName, producer));
      },
      onSubmit(producer) {
        ProducerService.saveProducer(producer)
          .then(loadProducers)
          .then(clearForm);
      },
    };
  },
)(reduxForm({
  form: formName,
  destroyOnUnmount: false,
})(ProducerForm));
