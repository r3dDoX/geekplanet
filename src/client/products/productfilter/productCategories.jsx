import Checkbox from 'material-ui/Checkbox';
import { grey200, grey800 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { ExtendedProductCategoryPropType } from '../../propTypes';

const FilterHeader = styled.h2`
  margin: 0;
  padding: 10px;
  background-color: ${grey200};
  color: ${grey800};
`;

const CategoryRow = styled.div`
  padding: 10px 10px 10px 40px;
`;

function RecursiveCategoryRow(productCategory) {
  return (
    <CategoryRow key={productCategory._id}>
      <Checkbox label={productCategory.de.name} />
      {productCategory.subCategories.length ?
        productCategory.subCategories.map(RecursiveCategoryRow) : null}
    </CategoryRow>
  );
}

const ProductCategories = ({
  productCategories,
}) => (
  <div>
    <FilterHeader>
      Categories
    </FilterHeader>
    {productCategories.map(RecursiveCategoryRow)}
  </div>
);

ProductCategories.propTypes = {
  productCategories: PropTypes.arrayOf(ExtendedProductCategoryPropType).isRequired,
};

export default ProductCategories;
