import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardMedia, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ActionTypes from '../actionTypes';
import ProductService from '../products/productService';

const styles = {
  productTile: {
    flexGrow: 1,
    maxWidth: '450px',
    minWidth: '150px',
    margin: '0 10px 10px',
  },
  productTileBody: {
    textAlign: 'justify',
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
            {(product.files.length) ? (
              <CardMedia>
                <img alt="Product" src={`/api/products/pictures/${product.files[0]}`} />
              </CardMedia>
            ) : null}
            <CardTitle>
              {product.name}
            </CardTitle>
            <CardText style={styles.productTileBody}>
              {product.description}
            </CardText>
            <CardActions>
              <RaisedButton label="Order" primary />
              <RaisedButton label="Save" />
            </CardActions>
          </Card>
        ))}
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
      ProductService.loadAllProducts().then(data => dispatch({
        type: ActionTypes.PRODUCTS_LOADED,
        data,
      }));
    },
  })
)(HomeComponent);
