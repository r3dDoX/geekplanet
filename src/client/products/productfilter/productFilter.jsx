import Popover from 'material-ui/Popover';
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
import ProductCategories from './productCategories.jsx';

export const formName = 'productFilter';

const FilterContainer = styled.div`
  padding: 20px;
`;

const FilterButton = styled(RaisedButton)`
  margin-left: 20px;
`;

const FilterPopover = styled(Popover)`
  width: 400px;
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
  constructor() {
    super();

    this.state = {
      open: true,
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
      open: !this.state.open,
    });
  }

  render() {
    const {
      filterProducts,
      groupedProductCategories,
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
          label="Weitere Filter"
          labelPosition="before"
          icon={<ArrowDown />}
        />
        <FilterPopover
          open={this.state.open}
          anchorEl={this.state.anchorElement}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={() => this.setState({ open: false })}
        >
          <ProductCategories productCategories={groupedProductCategories} />
        </FilterPopover>
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
  toggleProductCategory: PropTypes.func.isRequired,
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
