import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import { grey700 } from 'material-ui/styles/colors';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import PropTypes from 'prop-types';
import React from 'react';
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
import { ExtendedProductCategoryPropType, ProducerPropType } from '../../propTypes';
import { accent1Color, backgroundColor } from '../../theme';
import FilterPopover from './filterPopover.jsx';
import Producers from './producers.jsx';
import ProductCategories from './productCategories.jsx';

export const formName = 'productFilter';

const FilterContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  background: #FFF;
  z-index: 2;
  padding: 0 20px 10px;
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.3);
  max-height: 82px;
`;

const FilterButton = styled(RaisedButton)`
  margin-left: 20px;
  
  @media screen and (max-width: 659px) {
    display: none !important;
  }
`;

const FilterButtonLabel = styled.span`
  display: flex;
  align-items: center;
`;

const FilterChip = styled(Chip)`
  margin-left: 10px !important;
`;

const FilterHeader = styled.h2`
  margin: 0;
  padding: 10px;
  color: ${backgroundColor};
`;

const styles = {
  filterHint: {
    color: grey700,
    borderColor: grey700,
    fill: grey700,
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
  },
  filterChip: {
    lineHeight: '24px',
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
  constructor() {
    super();

    this.state = {
      anchorElement: undefined,
    };
  }

  componentWillMount() {
    if (this.props.groupedProductCategories.length === 0) {
      this.props.loadProductCategories();
    }

    if (this.props.producers.length === 0) {
      this.props.loadPublicPorducers();
    }
  }

  handleButtonClick(event) {
    this.setState({
      anchorElement: event.currentTarget,
    });
    this.props.toggleFilterView();
  }

  render() {
    const {
      filterProducts,
      groupedProductCategories,
      filterShown,
      categoriesToFilter,
      toggleFilterProductCategories,
      producersToFilter,
      toggleProducer,
      producers,
    } = this.props;

    return (
      <FilterContainer>
        <Field
          component={TextField}
          name="filterString"
          label={<FormattedMessage id="PRODUCT_FILTER.FILTERSTRING_PLACEHOLDER" />}
          floatingLabelStyle={styles.filterHint}
          underlineStyle={styles.filterHint}
          onKeyUp={({ target }) => debounce(() => filterProducts(target.value))}
          type="text"
        />
        <FilterButton
          onClick={event => this.handleButtonClick(event)}
          label={
            <FilterButtonLabel>
              Weitere Filter
              <FilterChip
                labelStyle={styles.filterChip}
                labelColor="#FFF"
                backgroundColor={accent1Color}
              >
                3
              </FilterChip>
            </FilterButtonLabel>}
          labelPosition="before"
          icon={<ArrowDown />}
          overlayStyle={styles.filterButton}
        />
        {filterShown ? (
          <FilterPopover
            anchorElementRect={this.state.anchorElement.getBoundingClientRect()}
            toggleFilterView={this.props.toggleFilterView}
          >
            <FilterHeader>
              Categories
            </FilterHeader>
            <ProductCategories
              productCategories={groupedProductCategories}
              categoriesToFilter={categoriesToFilter}
              toggleFilterProductCategories={toggleFilterProductCategories}
            />
            <FilterHeader>
              Producers
            </FilterHeader>
            <Producers
              producersToFilter={producersToFilter}
              producers={producers}
              toggleProducer={toggleProducer}
            />
          </FilterPopover>
        ) : null}
      </FilterContainer>
    );
  }
}

ProductFilter.propTypes = {
  groupedProductCategories: PropTypes.arrayOf(ExtendedProductCategoryPropType).isRequired,
  producers: PropTypes.arrayOf(ProducerPropType).isRequired,
  categoriesToFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  producersToFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterString: PropTypes.string.isRequired,
  filterShown: PropTypes.bool.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  loadPublicPorducers: PropTypes.func.isRequired,
  filterProducts: PropTypes.func.isRequired,
  toggleFilterProductCategories: PropTypes.func.isRequired,
  toggleProducer: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
  toggleFilterView: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    groupedProductCategories: state.products.groupedProductCategories,
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
    toggleFilterProductCategories(categories) {
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
