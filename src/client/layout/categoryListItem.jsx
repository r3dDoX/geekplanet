import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { ProductCategoryPropType } from '../propTypes';
import CategoryDivider from './categoryDivider.jsx';

const ArrowButton = styled.a`
  outline: none;
`;

class CategoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggleContainer = React.createRef();
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    const { category, selectedCategories } = this.props;
    const categoryIds = this.mapSubCategoryIds(category);
    this.setState({
      isOpen: selectedCategories.some(categoryId => categoryIds.includes(categoryId)),
    });
  }

  mapSubCategoryIds(category) {
    return category.subCategories
      .flatMap(subCategory => [subCategory._id].concat(this.mapSubCategoryIds(subCategory)));
  }

  render() {
    const {
      category,
      onSelect,
      selectedCategories,
    } = this.props;

    return [
      <ListItem
        button
        key={category._id}
        role="link"
        onClick={(event) => {
          if (!this.toggleContainer.current
            || !this.toggleContainer.current.contains(event.target)) {
            onSelect(category._id);
          }
        }}
      >
        <ListItemText primary={category.de.name} />
        {category.subCategories.length > 0 && (
          <ArrowButton
            role="button"
            tabIndex={0}
            innerRef={this.toggleContainer}
            onClick={() => {
              this.setState(prevState => ({
                isOpen: !prevState.isOpen,
              }));
            }}
          >
            {this.state.isOpen ? <ExpandLess /> : <ExpandMore />}
          </ArrowButton>
        )}
      </ListItem>,
      category.subCategories.length > 0 && (
        <Collapse
          key={`${category._id}_nested`}
          in={this.state.isOpen}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>
            {category.subCategories
              .flatMap(
                subCategory => (
                  <CategoryListItem
                    key={subCategory._id}
                    selectedCategories={selectedCategories}
                    category={subCategory}
                    onSelect={onSelect}
                  />
                )
              )
            }
          </List>
        </Collapse>
      ),
      !category.parentCategory
        ? <CategoryDivider key={`${category._id}Divider`} />
        : null,
    ];
  }
}

CategoryListItem.propTypes = {
  selectedCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  category: ProductCategoryPropType.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryListItem;
