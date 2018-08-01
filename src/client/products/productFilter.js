import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import SmallTextField from '../formHelpers/smallTextField';
import { ProductCategoryPropType } from '../propTypes';
import theme from '../theme';

export const formName = 'productFilter';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  background: #FFF;
  padding: 12px 20px;
  box-shadow: 0 0 10px -2px rgba(0, 0, 0, 0.3);
  max-height: 68px;
  overflow-x: auto;
  
  @media screen and (max-width: ${theme.breakpoints.values.md}) {
    justify-content: space-between;
  }
`;

const SearchField = styled(Field)`
  min-width: 100px;
`;

const ChipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const CategoryChip = styled(Chip)`
  margin-left: 10px !important;
`;

let timeoutId;

function debounce(fn, millis = 200) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(fn, millis);
}

const ProductFilter = ({
  categories,
  removeCategoryFromFilter,
  history,
  intl,
}) => (
  <FilterContainer>
    <SearchField
      component={SmallTextField}
      name="search"
      label={intl.formatMessage({ id: 'PRODUCT_FILTER.FILTERSTRING_PLACEHOLDER' })}
      onKeyUp={({ target }) => debounce(() => {
        const query = queryString.parse(history.location.search);
        query.search = target.value;
        delete query.page;

        history.push(`?${queryString.stringify(query)}`);
      })}
      type="text"
    />
    <ChipContainer>
      {categories.map(category => (
        <CategoryChip
          key={category._id}
          onDelete={() => removeCategoryFromFilter(category._id)}
          label={category.de.name}
        />
      ))}
    </ChipContainer>
  </FilterContainer>
);

ProductFilter.propTypes = {
  categories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  removeCategoryFromFilter: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  intl: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default reduxForm({
  form: formName,
  destroyOnUnmount: false,
})(withRouter(injectIntl(ProductFilter)));
