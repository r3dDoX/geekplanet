import { AutoComplete } from 'material-ui';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createLoadHomeTiles, createLoadProductCategories } from '../../actions';
import HomeTile from '../../home/homeTile.jsx';
import HomeTileContainer from '../../home/homeTilesContainer.jsx';
import { HomeTilePropType, ProductCategoryPropType } from '../../propTypes';
import AddHomeTile from './addHomeTile.jsx';

class HomeTilesForm extends React.Component {
  componentWillMount() {
    if (!this.props.tiles.length) {
      this.props.loadHomeTiles();
    }
    if (!this.props.productCategories.length) {
      this.props.loadProductCategories();
    }
  }

  render() {
    const {
      tiles,
      productCategories,
    } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        disabled
        onClick={this.handleClose}
      />,
    ];

    return (
      <HomeTileContainer>
        {tiles.map(tile => (
          <HomeTile key={tile._id} tile={tile} />
        ))}
        <AddHomeTile />
        <Dialog
          actions={actions}
          modal
          open
        >
          <AutoComplete
            hintText="Product Category"
            dataSource={productCategories.map(category => ({
              id: category._id,
              name: category.de.name,
            }))}
            dataSourceConfig={{ text: 'name', value: 'id' }}
            filter={AutoComplete.caseInsensitiveFilter}
          />
        </Dialog>
      </HomeTileContainer>
    );
  }
}

HomeTilesForm.propTypes = {
  tiles: HomeTilePropType.isRequired,
  productCategories: ProductCategoryPropType.isRequired,
  loadHomeTiles: PropTypes.func.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    tiles: state.home.tiles,
    productCategories: state.products.productCategories,
  }),
  dispatch => ({
    loadHomeTiles() {
      dispatch(createLoadHomeTiles());
    },
    loadProductCategories() {
      dispatch(createLoadProductCategories());
    },
  })
)(HomeTilesForm);
