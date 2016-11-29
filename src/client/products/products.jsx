import React from 'react';
import Layout from '../layout.jsx';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const submitForm = (endpoint, event) => {
  const inputs = Array.from(event.target.elements);
  const formData = inputs.reduce((entity, input) => {
    if (input.name && !input.disabled) {
      if (input.type === 'number') {
        entity[input.name] = Number(input.value);
      } else {
        entity[input.name] = input.value;
      }
    }

    return entity;
  }, {});

  const request = new XMLHttpRequest();
  request.open('POST', `/api/${endpoint}`);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(formData));

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