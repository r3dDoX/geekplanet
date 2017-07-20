import React from 'react';
import TextField from 'material-ui/TextField';
import { grey700 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ProductPropType } from '../../propTypes';
import { accent2Color } from '../../theme';

const containsCaseInsensitive = (string, filterCritera) =>
  string.toLowerCase().includes(filterCritera.toLowerCase());

function applyFilter(dispatchFunction, products, filterString) {
  dispatchFunction(products.filter(product =>
    containsCaseInsensitive(product.de.name, filterString) ||
    containsCaseInsensitive(product.de.shortDescription, filterString)
  ));
}

const styles = {
  container: {
    padding: '20px',
  },
  filter: {
    padding: '10px 20px',
    backgroundColor: accent2Color,
  },
  filterHint: {
    color: grey700,
  },
};

const ProductFilter = ({
  products,
  filterProducts,
}) => (
  <div style={styles.container}>
    <div style={styles.filter}>
      <TextField
        id="productFilter"
        hintText={<FormattedMessage id="PRODUCT_FILTER.PLACEHOLDER" />}
        hintStyle={styles.filterHint}
        onKeyUp={event => applyFilter(filterProducts, products, event.target.value)}
      />
    </div>
  </div>
);

ProductFilter.propTypes = {
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  filterProducts: PropTypes.func.isRequired,
};

export default ProductFilter;
