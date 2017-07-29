import React from 'react';
import TextField from 'material-ui/TextField';
import { grey700 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ProductPropType } from '../../propTypes';
import { accent2Color } from '../../theme';

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

let timeoutId;

function debounce(fn, millis = 200) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(fn, millis);
}

const ProductFilter = ({
  filterProducts,
}) => (
  <div style={styles.container}>
    <div style={styles.filter}>
      <TextField
        id="productFilter"
        hintText={<FormattedMessage id="PRODUCT_FILTER.PLACEHOLDER" />}
        hintStyle={styles.filterHint}
        onKeyUp={({ target }) => debounce(() => filterProducts(target.value))}
      />
    </div>
  </div>
);

ProductFilter.propTypes = {
  filterProducts: PropTypes.func.isRequired,
};

export default ProductFilter;
