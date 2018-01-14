import RaisedButton from 'material-ui/RaisedButton';
import { grey200, grey700, grey800 } from 'material-ui/styles/colors';
import FilterIcon from 'material-ui/svg-icons/image/tune';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import {
  createFilterProducts, createLoadProductCategories, createLoadPublicProducers,
  createResetFilter, createToggleFilterView,
} from '../../actions';
import SmallTextField from '../../formHelpers/smallTextField.jsx';
import { ProducerPropType, ProductCategoryPropType } from '../../propTypes';
import { backgroundColor, mdMinSize, xsMaxSize } from '../../theme';
import { recursivelyMapIds, recursivelyMapIdsIfNotPresent } from '../productCategoryHelper';
import FilterBadge from './filterBadge.jsx';
import FilterPopover from './filterPopover.jsx';
import Producers from './producers.jsx';
import ProductCategories from './productCategories.jsx';

export const formName = 'productFilter';

const FilterContainer = styled.div`
  background: #FFF;
  padding: 10px 20px;
  box-shadow: 0 0 10px -2px rgba(0, 0, 0, 0.3);
  max-height: 68px;
  
  @media screen and (min-width: ${mdMinSize}) {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 2;
  }
`;

const FilterButton = styled(RaisedButton)`
  margin-left: 20px;
  
  @media screen and (max-width: ${xsMaxSize}) {
    display: none !important;
  }
`;

const MobileFilterButton = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  background-color: ${grey200};
  padding: 5px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  color: ${grey800};
  box-shadow: 0 1px 1px 1px rgba(0,0,0,0.2);
  cursor: pointer;
  
  @media screen and (min-width: ${mdMinSize}) {
    display: none !important;
  }
`;

const FilterButtonLabel = styled.span`
  display: flex;
  align-items: center;
`;

const FilterHeader = styled.h2`
  margin: 0;
  padding: 10px;
  color: ${backgroundColor};
`;

const StyledFilterIcon = styled(FilterIcon)`
  margin-right: 10px;
`;

const MobileFilterButtonText = styled.div`
  white-space: nowrap;
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

    this.state = {};
  }

  componentWillMount() {
    if (this.props.groupedProductCategories.length === 0) {
      this.props.loadProductCategories();
    }

    if (this.props.producers.length === 0) {
      this.props.loadPublicPorducers();
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.filterShown) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'visible';
    }
  }

  handleButtonClick(top) {
    this.setState({
      top,
    });
    this.props.toggleFilterView();
  }

  render() {
    const {
      filterProducts,
      groupedProductCategories,
      filterShown,
      categoriesToFilter,
      producersToFilter,
      producers,
      moreFiltersCount,
      toggleFilterView,
      resetFilter,
      history,
      productCategories,
    } = this.props;

    return (
      <FilterContainer>
        <Field
          component={SmallTextField}
          name="filterString"
          label={<FormattedMessage id="PRODUCT_FILTER.FILTERSTRING_PLACEHOLDER" />}
          floatingLabelStyle={styles.filterHint}
          underlineStyle={styles.filterHint}
          onKeyUp={({ target }) => debounce(() => filterProducts(target.value))}
          type="text"
        />
        <FilterButton
          onClick={({ currentTarget }) => {
            const boundingRect = currentTarget.getBoundingClientRect();
            this.handleButtonClick(boundingRect.top + boundingRect.height + 5);
          }}
          label={
            <FilterButtonLabel>
              <FormattedMessage id="PRODUCT_FILTER.MORE_FILTERS" />
              <FilterBadge filterCount={moreFiltersCount} />
            </FilterButtonLabel>
          }
          labelPosition="before"
          icon={<ArrowDown />}
          overlayStyle={styles.filterButton}
        />
        <MobileFilterButton
          onClick={() => this.handleButtonClick(0)}
        >
          <StyledFilterIcon color={grey800} />
          <MobileFilterButtonText>
            <FormattedMessage id="PRODUCT_FILTER.MORE_FILTERS" />
          </MobileFilterButtonText>
          <FilterBadge filterCount={moreFiltersCount} />
        </MobileFilterButton>
        <FilterPopover
          top={this.state.top}
          toggleFilterView={toggleFilterView}
          resetFilter={() => {
            history.push('?');
            resetFilter();
          }}
          filterShown={filterShown}
        >
          <FilterHeader>
            <FormattedMessage id="PRODUCT_FILTER.PRODUCT_CATEGORIES_TITLE" />
          </FilterHeader>
          <ProductCategories
            productCategories={groupedProductCategories}
            categoriesToFilter={categoriesToFilter}
            toggleFilterProductCategory={(category, checked) => {
              const query = queryString.parse(history.location.search);
              const categories = query.categories ? query.categories.split(',') : [];

              if (checked) {
                query.categories = categories.concat(
                  recursivelyMapIdsIfNotPresent(
                    productCategories.filter(actCategory => categories.includes(actCategory._id)),
                    category
                  ).map(actCategory => actCategory._id)
                ).join(',');
              } else {
                const idsToRemove = recursivelyMapIds(category);

                query.categories = categories.filter(
                  actCategoryId => !idsToRemove.includes(actCategoryId),
                );
              }

              history.push(`?${queryString.stringify(query)}`);
            }}
          />
          <FilterHeader>
            <FormattedMessage id="PRODUCT_FILTER.PRODUCERS_TITLE" />
          </FilterHeader>
          <Producers
            producersToFilter={producersToFilter}
            producers={producers}
            toggleProducer={(producer, checked) => {
              const query = queryString.parse(history.location.search);
              const queryProducers = query.producers ? query.producers.split(',') : [];
              const completeProducers = queryProducers
                .filter(actProducer => queryProducers.includes(actProducer._id));

              if (checked) {
                query.producers = completeProducers
                  .concat(producer)
                  .map(actProducer => actProducer._id);
              } else {
                query.producers = completeProducers
                  .filter(producerToFilter => producerToFilter._id !== producer._id)
                  .map(actProducer => actProducer._id);
              }

              history.push(`?${queryString.stringify(query)}`);
            }}
          />
        </FilterPopover>
      </FilterContainer>
    );
  }
}

ProductFilter.propTypes = {
  groupedProductCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  producers: PropTypes.arrayOf(ProducerPropType).isRequired,
  categoriesToFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  producersToFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterShown: PropTypes.bool.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  loadPublicPorducers: PropTypes.func.isRequired,
  filterProducts: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
  toggleFilterView: PropTypes.func.isRequired,
  moreFiltersCount: PropTypes.number.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  state => ({
    groupedProductCategories: state.products.groupedProductCategories,
    productCategories: state.products.productCategories,
    producers: state.products.producers,
    categoriesToFilter: state.products.categoriesToFilter,
    producersToFilter: state.products.producersToFilter,
    filteredProducts: state.products.filteredProducts,
    filterString: state.products.filterString,
    filterShown: state.products.filterShown,
    moreFiltersCount: state.products.moreFiltersCount,
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
})(withRouter(ProductFilter)));
