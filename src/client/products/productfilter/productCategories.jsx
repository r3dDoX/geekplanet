import Checkbox from 'material-ui/Checkbox';
import { grey200, grey400, grey800 } from 'material-ui/styles/colors';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import PropTypes from 'prop-types';
import React from 'react';
import AnimateHeight from 'react-animate-height';
import styled from 'styled-components';
import { ExtendedProductCategoryPropType } from '../../propTypes';

const FilterHeader = styled.h2`
  margin: 0;
  padding: 10px;
  color: ${grey800};
`;

const CategoryRow = styled.div`
  padding-left: 40px;
  border-top: 1px solid #FFF;
  background-color: ${grey200};
`;

const CategoryInlay = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CheckboxWrapper = styled.div`
  padding: 10px;
  width: auto !important;
  flex: 1 1 auto;
`;

const Toggle = styled.div`
  padding: 0 10px;
  cursor: pointer;
  background-color: ${grey400};
  display: flex;
  align-items: center;
`;

class ProductCategories extends React.Component {
  constructor() {
    super();

    this.state = {
      openCategories: [],
    };
  }

  toggleCategory(category) {
    let openCategories;

    openCategories = this.state.openCategories
      .filter(openCategory => openCategory._id !== category._id);

    if (openCategories.length === this.state.openCategories.length) {
      openCategories = openCategories.concat(category);
    }

    this.setState({
      openCategories,
    });
  }

  recursiveCategoryRow(productCategory) {
    return (
      <CategoryRow key={productCategory._id}>
        <CategoryInlay>
          <CheckboxWrapper>
            <Checkbox label={productCategory.de.name} />
          </CheckboxWrapper>
          {productCategory.subCategories.length ? (
            <Toggle onClick={() => this.toggleCategory(productCategory)}>
              <ArrowDown />
            </Toggle>
          ) : null}
        </CategoryInlay>
        {productCategory.subCategories.length ? (
          <AnimateHeight
            duration={250}
            height={
              this.state.openCategories
                .find(openCategory => openCategory._id === productCategory._id) ? 'auto' : 0
            }
          >
            {productCategory.subCategories.map((...args) => this.recursiveCategoryRow(...args))}
          </AnimateHeight>
        ) : null}
      </CategoryRow>
    );
  }

  render() {
    const {
      productCategories,
    } = this.props;

    return (
      <div>
        <FilterHeader>
          Categories
        </FilterHeader>
        {productCategories.map((...args) => this.recursiveCategoryRow(...args))}
      </div>
    );
  }
}

ProductCategories.propTypes = {
  productCategories: PropTypes.arrayOf(ExtendedProductCategoryPropType).isRequired,
};

export default ProductCategories;
