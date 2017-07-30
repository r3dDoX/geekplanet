import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import { grey700 } from 'material-ui/styles/colors';
import CancelIcon from 'material-ui/svg-icons/action/highlight-off';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import {
  createFilterProducts,
  createLoadProductCategories,
  createResetFilter,
  createToggleFilterCategory,
} from '../../actions';
import TextField from '../../formHelpers/textField.jsx';
import { ProductCategoryPropType } from '../../propTypes';
import { accent2Color } from '../../theme';

const formName = 'productFilter';

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

class ProductFilter extends React.Component {

  componentWillMount() {
    if (this.props.productCategories.length === 0) {
      this.props.loadProductCategories();
    }
  }

  render() {
    const {
      filterProducts,
      productCategories,
      categoriesToFilter,
      toggleProductCategory,
      resetFilter,
    } = this.props;

    return (
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
          <SelectField
            name="categories"
            floatingLabelText="Product Categories"
            onChange={(event, index, values) => toggleProductCategory(values)}
            value={categoriesToFilter}
            multiple
          >
            {productCategories.map(productCategory => (
              <MenuItem
                key={productCategory._id}
                value={productCategory}
                primaryText={productCategory.de.name}
                insetChildren
                checked={categoriesToFilter.some(
                  categoryToFilter => categoryToFilter._id === productCategory._id,
                )}
              />
            ))}
          </SelectField>
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
  }
}

ProductFilter.propTypes = {
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  categoriesToFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  filterProducts: PropTypes.func.isRequired,
  toggleProductCategory: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    productCategories: state.products.productCategories,
    categoriesToFilter: state.products.categoriesToFilter,
    filteredProducts: state.products.filteredProducts,
  }),
  dispatch => ({
    loadProductCategories() {
      dispatch(createLoadProductCategories());
    },
    filterProducts(filterString) {
      dispatch(createFilterProducts(filterString));
    },
    toggleProductCategory(category) {
      dispatch(createToggleFilterCategory(category));
    },
    resetFilter() {
      dispatch(createResetFilter());
      dispatch(reset(formName));
    },
  }),
)(reduxForm({
  form: formName,
  destroyOnUnmount: false,
})(ProductFilter));
