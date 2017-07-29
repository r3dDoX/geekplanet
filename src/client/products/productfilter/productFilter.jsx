import RaisedButton from 'material-ui/RaisedButton';
import { grey700 } from 'material-ui/styles/colors';
import CancelIcon from 'material-ui/svg-icons/action/highlight-off';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import TextField from '../../formHelpers/textField.jsx';
import SelectField from '../../formHelpers/selectField.jsx';
import { accent2Color } from '../../theme';
import { MenuItem } from 'material-ui';
import { ProductCategoryPropType } from '../../propTypes';

const styles = {
  container: {
    padding: '20px',
  },
  filter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
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
  productCategories,
  categoriesToFilter,
  toggleProductCategory,
  resetFilter,
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
      <Field
        component={SelectField}
        name="categories"
        label="Product Categories"
        onChange={event => toggleProductCategory(event[0])}
        multiple
      >
        {productCategories.map(productCategory => (
          <MenuItem
            key={productCategory._id}
            value={productCategory._id}
            primaryText={productCategory.de.name}
            insetChildren
            checked={categoriesToFilter.includes(productCategory._id)}
          />
        ))}
      </Field>
      <RaisedButton
        onTouchTap={resetFilter}
        label={<FormattedMessage id="PRODUCT_FILTER.RESET_FILTER" />}
        secondary
        style={styles.button}
        icon={<CancelIcon />}
      />
    </div>
  </div>
);

ProductFilter.propTypes = {
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  categoriesToFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterProducts: PropTypes.func.isRequired,
  toggleProductCategory: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'productFilter',
  destroyOnUnmount: false,
})(ProductFilter);
