import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Layout from '../layout.jsx';

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

const createPreviewPictures = (event) => {
  const previewContainer = document.getElementById('productImagesPreview');
  previewContainer.innerHTML = '';

  Array.from(event.target.files).forEach((file) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const previewPicture = document.createElement('img');
      previewPicture.style = 'height: 100px';
      previewPicture.src = readerEvent.target.result;
      previewContainer.appendChild(previewPicture);
    };

    reader.readAsDataURL(file);
  });
};

export default () => (
  <Layout>
    <Card className="form-card">
      <CardHeader title="Products" />
      <CardText>
        <form name="products" onSubmit={event => submitForm('products', event)}>
          <TextField floatingLabelText="Name" name="name" type="text" fullWidth />
          <TextField floatingLabelText="Price" name="price" type="number" fullWidth />
          <TextField
            floatingLabelText="Stock"
            name="stock"
            defaultValue="0"
            type="number"
            fullWidth
          />
          <RaisedButton
            label="Choose images"
            labelPosition="before"
            containerElement="label"
          >
            <input
              name="productPictures[]"
              type="file"
              accept="image/jpeg,image/png"
              multiple
              style={styles.fileUploadInput}
              onChange={createPreviewPictures}
            />
          </RaisedButton>
          <div id="productImagesPreview" />
          <br /><br />
          <RaisedButton label="Save" type="submit" primary />
        </form>
      </CardText>
    </Card>

    <Card className="form-card">
      <CardHeader title="Suppliers" />
      <CardText>
        <form name="suppliers" onSubmit={event => submitForm('suppliers', event)}>
          <TextField floatingLabelText="Name" name="name" type="text" fullWidth />
          <TextField floatingLabelText="Contact" name="contact" type="text" fullWidth />
          <TextField
            floatingLabelText="Payment Terms"
            name="paymentTerms"
            type="text"
            multiLine
            rows={3}
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
          <RaisedButton label="Save" primary type="submit" />
        </form>
      </CardText>
    </Card>

    <Card className="form-card">
      <CardHeader title="Producers" />
      <CardText>
        <form name="producers" onSubmit={event => submitForm('producers', event)}>
          <TextField floatingLabelText="Name" name="name" type="text" fullWidth />
          <h3>Address</h3>
          <TextField floatingLabelText="Street Name" name="streetName" type="text" fullWidth />
          <TextField floatingLabelText="House Number" name="houseNumber" type="text" fullWidth />
          <TextField floatingLabelText="ZIP" name="zip" type="number" fullWidth />
          <TextField floatingLabelText="City" name="city" type="city" fullWidth />

          <RaisedButton label="Save" primary type="submit" />
        </form>
      </CardText>
    </Card>
  </Layout>
);
