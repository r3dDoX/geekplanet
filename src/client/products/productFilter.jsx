import Chip from '@material-ui/core/Chip';
import grey from '@material-ui/core/colors/grey';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import SmallTextField from '../formHelpers/smallTextField.jsx';
import { ProductCategoryPropType } from '../propTypes';
import { laMinSize, mdMinSize, mdMaxSize } from '../theme';

const grey700 = grey['700'];
export const formName = 'productFilter';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #FFF;
  padding: 4px 20px;
  box-shadow: 0 0 10px -2px rgba(0, 0, 0, 0.3);
  max-height: 68px;
  overflow-x: auto;
  
  @media screen and (max-width: ${mdMaxSize}) {
    justify-content: space-between;
  }
  
  @media screen and (min-width: ${mdMinSize}) {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 2;
  }
  
  @media screen and (min-width: ${laMinSize}) {
    padding-left: 276px;
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

const ProductFilter = ({
  categories,
  removeCategoryFromFilter,
  history,
}) => (
  <FilterContainer>
    <SearchField
      component={SmallTextField}
      name="search"
      label={<FormattedMessage id="PRODUCT_FILTER.FILTERSTRING_PLACEHOLDER" />}
      floatingLabelStyle={styles.filterHint}
      underlineStyle={styles.filterHint}
      onKeyUp={({ target }) => debounce(() => {
        const query = queryString.parse(history.location.search);
        query.search = target.value;

        history.push(`?${queryString.stringify(query)}`);
      })}
      type="text"
    />
    <ChipContainer>
      {categories.map(category => (
        <CategoryChip key={category._id} onRequestDelete={() => removeCategoryFromFilter(category._id)}>
          {category.de.name}
        </CategoryChip>
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
};

export default reduxForm({
  form: formName,
  destroyOnUnmount: false,
})(withRouter(ProductFilter));
