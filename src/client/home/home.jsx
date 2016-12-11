import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { Card, CardTitle, CardMedia, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ActionTypes from '../actionTypes';

const styles = {
  productTile: {
    flexGrow: 1,
    maxWidth: '500px',
    minWidth: '150px',
    margin: '0 10px 10px',
  },
};


class HomeComponent extends React.Component {

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    return (
      <div className="content">
        {this.props.products.map(product => (
          <Card key={product._id} style={styles.productTile}>
            <CardMedia>
              <img alt="Product" src={`/api/products/pictures/${product.files[0]}`} />
            </CardMedia>
            <CardTitle>
              {product.name}
            </CardTitle>
            <CardText>
              {product.description}
            </CardText>
            <CardActions>
              <RaisedButton label="Order" primary />
              <RaisedButton label="Save" />
            </CardActions>
          </Card>
        ))}

        <Link to="/forms">Forms</Link>
      </div>
    );
  }
}

HomeComponent.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.string),
  })),
  loadProducts: PropTypes.func,
};

export default connect(
  state => state.products,
  dispatch => ({
    loadProducts() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/api/products');
      xhr.onload = () => dispatch({
        type: ActionTypes.PRODUCTS_LOADED,
        data: JSON.parse(xhr.response),
      });
      xhr.send();
    },
  })
)(HomeComponent);
