import React from 'react';
import Layout from '../layout.jsx';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
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
};

const submitForm = (endpoint, event) => {
  const formData = new FormData(event.target);

  const request = new XMLHttpRequest();
  request.open('POST', `/api/${endpoint}`);
  request.send(formData);

  event.preventDefault();
};

export default () => (
  <Layout>
    <Card className="form-card">
      <CardHeader title="Products" />
      <CardText>
        <form name="products" onSubmit={(event) => submitForm('products', event)}>
          <TextField floatingLabelText="Name" name="name" type="text" fullWidth={true}></TextField>
          <TextField floatingLabelText="Price" name="price" type="number" fullWidth={true}></TextField>
          <TextField floatingLabelText="Stock" name="stock" defaultValue="0" type="number" fullWidth={true}></TextField>
          <RaisedButton
            label="Choose images"
            labelPosition="before"
            containerElement="label"
          >
            <input name="productPictures[]" type="file" multiple style={styles.fileUploadInput} />
          </RaisedButton>
          <br /><br />
          <RaisedButton label="Save" primary={true} type="submit"/>
        </form>
      </CardText>
    </Card>

    <Card className="form-card">
      <CardHeader title="Suppliers" />
      <CardText>
        <form name="suppliers" onSubmit={(event) => submitForm('suppliers', event)}>
          <TextField floatingLabelText="Name" name="name" type="text" fullWidth={true}></TextField>
          <TextField floatingLabelText="Contact" name="contact" type="text" fullWidth={true}></TextField>
          <TextField floatingLabelText="Payment Terms" name="paymentTerms" type="text" multiLine={true} rows={3} fullWidth={true}></TextField>
          <h3>Address</h3>
          <TextField floatingLabelText="Street Name" name="streetName" type="text" fullWidth={true}></TextField>
          <TextField floatingLabelText="House Number" name="houseNumber" type="text" fullWidth={true}></TextField>
          <TextField floatingLabelText="ZIP" name="zip" type="number" fullWidth={true}></TextField>
          <TextField floatingLabelText="City" name="city" type="city" fullWidth={true}></TextField>
          <RaisedButton label="Save" primary={true} type="submit"/>
        </form>
      </CardText>
    </Card>

    <Card className="form-card">
      <CardHeader title="Producers" />
      <CardText>
        <form name="producers" onSubmit={(event) => submitForm('producers', event)}>
          <TextField floatingLabelText="Name" name="name" type="text" fullWidth={true}></TextField>
          <h3>Address</h3>
          <TextField floatingLabelText="Street Name" name="streetName" type="text" fullWidth={true}></TextField>
          <TextField floatingLabelText="House Number" name="houseNumber" type="text" fullWidth={true}></TextField>
          <TextField floatingLabelText="ZIP" name="zip" type="number" fullWidth={true}></TextField>
          <TextField floatingLabelText="City" name="city" type="city" fullWidth={true}></TextField>

          <RaisedButton label="Save" primary={true} type="submit"/>
        </form>
      </CardText>
    </Card>
  </Layout>
);