import { grey700 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import TextField from '../../formHelpers/textField.jsx';
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
      <Field
        component={TextField}
        name="filterString"
        label={<FormattedMessage id="PRODUCT_FILTER.PLACEHOLDER" />}
        hintStyle={styles.filterHint}
        onKeyUp={({ target }) => debounce(() => filterProducts(target.value))}
        type="text"
      />
    </div>
  </div>
);

ProductFilter.propTypes = {
  filterProducts: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'productFilter',
  destroyOnUnmount: false,
})(ProductFilter);
