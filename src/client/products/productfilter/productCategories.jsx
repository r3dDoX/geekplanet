import React from 'react';
import styled from 'styled-components';
import { grey200, grey800 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import { ExtendedProductCategoryPropType } from '../../propTypes';

const FilterHeader = styled.h2`
  margin: 0;
  padding: 10px;
  background-color: ${grey200};
  color: ${grey800};
`;

const ProductCategories = ({
  productCategories,
}) => (
  <div>
    <FilterHeader>
      Categories
    </FilterHeader>
    {productCategories.map(productCategory => (
      <div>
        {productCategory.de.name}
      </div>
    ))}
  </div>
);

ProductCategories.propTypes = {
  productCategories: PropTypes.arrayOf(ExtendedProductCategoryPropType).isRequired,
};

export default ProductCategories;
