import React from 'react';
import Link from 'react-router/lib/Link';
import { Card, CardTitle, CardMedia, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  productTile: {
    flexGrow: 1,
    maxWidth: '300px',
    minWidth: '150px',
    margin: '0 10px 10px',
  },
};

export default () => (
  <div className="content">
    <Card style={styles.productTile}>
      <CardMedia>
        <img alt="Product" src="assets/images/lemanRuss.png" />
      </CardMedia>
      <CardTitle>
        Lorem Ipsum
      </CardTitle>
      <CardText>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
        accusam et justo duo dolores
      </CardText>
      <CardActions>
        <RaisedButton label="Order" primary />
        <RaisedButton label="Save" />
      </CardActions>
    </Card>

    <Link to="/forms">Forms</Link>
  </div>
);
