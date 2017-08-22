import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createLoadSpotlightProducts } from '../actions';
import ProductList from '../products/productList.jsx';
import { ProductPropType } from '../propTypes';
import { backgroundColor } from '../theme';
import Slogan from './slogan.jsx';

const Header = styled.div`
  padding: 80px 30px;
  background-color: ${backgroundColor};
  
  @media (max-width: 659px) {
    display: none;
  }
`;

const SloganContainer = styled.div`
  max-width: 350px;
  margin: 0 auto;
`;

const ProductLinkButton = styled(RaisedButton)`
  margin: 20px;
`;

class Home extends React.Component {
  componentWillMount() {
    if (this.props.spotlightProducts.length === 0) {
      this.props.loadSpotlightProducts();
    }
  }

  render() {
    const { spotlightProducts } = this.props;

    return (
      <div>
        <Header>
          <SloganContainer>
            <Slogan />
          </SloganContainer>
        </Header>
        <ProductList products={spotlightProducts} />
        <ProductLinkButton
          primary
          label={<FormattedMessage id="PRODUCT.TO_PRODUCTS" />}
          containerElement={<Link to="/products" />}
        />
      </div>
    );
  }
}

Home.propTypes = {
  spotlightProducts: PropTypes.arrayOf(ProductPropType).isRequired,
  loadSpotlightProducts: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    spotlightProducts: state.products.spotlightProducts,
  }),
  dispatch => ({
    loadSpotlightProducts() {
      dispatch(createLoadSpotlightProducts());
    },
  })
)(Home);
