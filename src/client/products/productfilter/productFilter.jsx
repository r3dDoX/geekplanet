import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import { grey700 } from 'material-ui/styles/colors';
import CancelIcon from 'material-ui/svg-icons/action/highlight-off';
import ArrowUp from 'material-ui/svg-icons/navigation/expand-less';
import PropTypes from 'prop-types';
import React from 'react';
import AnimateHeight from 'react-animate-height';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import {
  createFilterProducts,
  createLoadProductCategories,
  createLoadPublicProducers,
  createResetFilter,
  createToggleFilterCategory,
  createToggleFilterProducer,
  createToggleFilterView,
} from '../../actions';
import TextField from '../../formHelpers/textField.jsx';
import { ProducerPropType, ProductCategoryPropType } from '../../propTypes';
import { accent2Color } from '../../theme';

export const formName = 'productFilter';

const FilterContainer = styled.div`
  padding: 20px;
`;

const FilterInlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: ${accent2Color};
`;

const FilterItem = styled.div`
  padding: 0 20px 20px;
`;

const FilterTitle = styled.h3`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 20px;
  font-weight: 400;
  background-color: ${accent2Color};
  cursor: pointer;
`;

const styles = {
  filterHint: {
    color: grey700,
    borderColor: grey700,
    fill: grey700,
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

    if (this.props.producers.length === 0) {
      this.props.loadPublicPorducers();
    }
  }

  render() {
    const {
      filterProducts,
      productCategories,
      producers,
      filterString,
      categoriesToFilter,
      producersToFilter,
      toggleProductCategory,
      toggleProducer,
      resetFilter,
      filterShown,
      toggleFilterView,
    } = this.props;

    const noFiltersSet = () =>
      filterString.length === 0 &&
      categoriesToFilter.length === 0 &&
      producersToFilter.length === 0;

    return (
      <FilterContainer>
        <FilterTitle onClick={toggleFilterView}>
          <FormattedMessage id="PRODUCT_FILTER.TITLE" />
          <ArrowUp style={{ transform: filterShown ? 'rotate(0deg)' : 'rotate(180deg)' }} />
        </FilterTitle>
        <AnimateHeight
          duration={250}
          height={filterShown ? 'auto' : 0}
        >
          <FilterInlay>
            <FilterItem>
              <Field
                component={TextField}
                name="filterString"
                label={<FormattedMessage id="PRODUCT_FILTER.FILTERSTRING_PLACEHOLDER" />}
                floatingLabelStyle={styles.filterHint}
                underlineStyle={styles.filterHint}
                onKeyUp={({ target }) => debounce(() => filterProducts(target.value))}
                type="text"
              />
            </FilterItem>
            <FilterItem>
              <SelectField
                name="categories"
                floatingLabelText={
                  <FormattedMessage id="PRODUCT_FILTER.PRODUCT_CATEGORIES_PLACEHOLDER" />
                }
                onChange={(event, index, values) => toggleProductCategory(values)}
                floatingLabelStyle={styles.filterHint}
                underlineStyle={styles.filterHint}
                iconStyle={styles.filterHint}
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
            </FilterItem>
            <FilterItem>
              <SelectField
                name="producers"
                floatingLabelText={<FormattedMessage id="PRODUCT_FILTER.PRODUCERS_PLACEHOLDER" />}
                onChange={(event, index, values) => toggleProducer(values)}
                floatingLabelStyle={styles.filterHint}
                underlineStyle={styles.filterHint}
                iconStyle={styles.filterHint}
                value={producersToFilter}
                multiple
              >
                {producers.map(producer => (
                  <MenuItem
                    key={producer._id}
                    value={producer}
                    primaryText={producer.name}
                    insetChildren
                    checked={producersToFilter.some(
                      producerToFilter => producerToFilter._id === producer._id,
                    )}
                  />
                ))}
              </SelectField>
            </FilterItem>
            <FilterItem>
              <RaisedButton
                onTouchTap={resetFilter}
                label={<FormattedMessage id="PRODUCT_FILTER.RESET_FILTER" />}
                secondary
                style={styles.button}
                icon={<CancelIcon />}
                disabled={noFiltersSet()}
              />
            </FilterItem>
          </FilterInlay>
        </AnimateHeight>
      </FilterContainer>
    );
  }
}

ProductFilter.propTypes = {
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  producers: PropTypes.arrayOf(ProducerPropType).isRequired,
  categoriesToFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  producersToFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterString: PropTypes.string.isRequired,
  filterShown: PropTypes.bool.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  loadPublicPorducers: PropTypes.func.isRequired,
  filterProducts: PropTypes.func.isRequired,
  toggleProductCategory: PropTypes.func.isRequired,
  toggleProducer: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
  toggleFilterView: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    productCategories: state.products.productCategories,
    producers: state.products.producers,
    categoriesToFilter: state.products.categoriesToFilter,
    producersToFilter: state.products.producersToFilter,
    filteredProducts: state.products.filteredProducts,
    filterString: state.products.filterString,
    filterShown: state.products.filterShown,
  }),
  dispatch => ({
    loadProductCategories() {
      dispatch(createLoadProductCategories());
    },
    loadPublicPorducers() {
      dispatch(createLoadPublicProducers());
    },
    filterProducts(filterString) {
      dispatch(createFilterProducts(filterString));
    },
    toggleProductCategory(categories) {
      dispatch(createToggleFilterCategory(categories));
    },
    toggleProducer(producers) {
      dispatch(createToggleFilterProducer(producers));
    },
    toggleFilterView() {
      dispatch(createToggleFilterView());
    },
    resetFilter() {
      dispatch(createResetFilter());
    },
  }),
)(reduxForm({
  form: formName,
  destroyOnUnmount: false,
})(ProductFilter));
