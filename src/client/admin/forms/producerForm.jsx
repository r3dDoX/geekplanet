import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionTypes from '../../actionTypes';
import extractAndSubmitForm from './extractAndSubmitForm';
import ProducerService from '../../producers/producerService';

const styles = {
  container: {
    padding: '20px',
  },
};

const ProducerFormComponent = ({
  loadProducers,
}) => (
  <Paper style={styles.container}>
    <form
      name="producers"
      onSubmit={(event) => {
        event.preventDefault();
        extractAndSubmitForm(ProducerService.saveProducer, event.target)
          .then(loadProducers);
      }}
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
);

ProducerFormComponent.propTypes = {
  loadProducers: PropTypes.func,
};

export default connect(
  state => state.forms,
  dispatch => ({
    loadProducers() {
      ProducerService.loadProducers().then(categories => dispatch({
        type: ActionTypes.PRODUCERS_LOADED,
        data: categories,
      }));
    },
  })
)(ProducerFormComponent);
