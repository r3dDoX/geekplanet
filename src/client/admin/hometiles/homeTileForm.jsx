import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Field, formValueSelector, initialize, reduxForm } from 'redux-form';
import { createLoadProductCategories, createLoadProducts } from '../../actions';
import AutoCompleteField from '../../formHelpers/autoCompleteField.jsx';
import TextField from '../../formHelpers/textField.jsx';
import { required } from '../../formHelpers/validations.jsx';
import { HomeTilePropType, ProductCategoryPropType, ProductPropType } from '../../propTypes';
import { createSaveTile } from '../adminActions';
import PictureField from './pictureField.jsx';

export const formName = 'homeTiles';
const selector = formValueSelector(formName);

function mapSubCategoriesRecursive(category) {
  return [
    category._id,
    ...category.subCategories.flatMap(mapSubCategoriesRecursive),
  ];
}


class HomeTileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initWhenLoaded: !!props.selectedTileId,
    };
  }

  componentWillMount() {
    if (!this.props.productCategories.length) {
      this.props.loadProductCategories();
    }
    if (!this.props.products.length) {
      this.props.loadProducts();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.initWhenLoaded
      && nextProps.productCategories.length
      && nextProps.products.length
    ) {
      this.setState({
        initWhenLoaded: false,
      });
      this.props.initForm(this.props.tiles.find(tile => tile._id === this.props.selectedTileId));
    }
  }

  render() {
    const {
      selectedTileId,
      selectedCategory,
      productCategories,
      products,
      handleSubmit,
      saveTile,
      history,
    } = this.props;

    const categoriesToFilter = (selectedCategory && productCategories.length)
      ? mapSubCategoriesRecursive(
        productCategories.find(category => category._id === selectedCategory)
      ) : [];

    return (
      <form
        name={formName}
        onSubmit={handleSubmit((tile) => {
          saveTile(tile);
          history.push('/admin/hometiles');
        })}
      >
        <Field
          component="input"
          name="_id"
          value={selectedTileId}
          style={{ display: 'none' }}
          readOnly
        />
        <Field
          component={AutoCompleteField}
          name="category"
          label="Product Category"
          dataSource={productCategories.map(category => ({
            id: category._id,
            name: category.de.name,
          }))}
          dataSourceConfig={{ text: 'name', value: 'id' }}
          filter={AutoComplete.caseInsensitiveFilter}
        />
        <br />
        <Field
          component={TextField}
          name="de.name"
          label="Title"
          type="text"
          validate={required}
        />
        <br />
        <Field
          component={PictureField}
          name="picture"
          label="Picture"
          pictures={selectedCategory
            ? products
              .filter(product => categoriesToFilter.includes(product.category))
              .map(product => product.files[0])
              .filter(picture => !!picture)
            : products.map(product => product.files[0]).filter(picture => !!picture)
          }
        />
        <br />
        <RaisedButton
          label={<FormattedMessage id="COMMON.SAVE" />}
          type="submit"
          primary
        />
&nbsp;
        <RaisedButton
          label={<FormattedMessage id="COMMON.CANCEL" />}
          type="button"
          containerElement={
            <Link to="/admin/hometiles">
              <FormattedMessage id="COMMON.CANCEL" />
            </Link>
          }
        />
      </form>
    );
  }
}

HomeTileForm.propTypes = {
  tiles: HomeTilePropType.isRequired,
  selectedTileId: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  productCategories: PropTypes.arrayOf(ProductCategoryPropType).isRequired,
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadProductCategories: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initForm: PropTypes.func.isRequired,
  saveTile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(
  state => ({
    tiles: state.home.tiles,
    productCategories: state.products.productCategories,
    products: state.products.products,
    selectedCategory: selector(state, 'category'),
  }),
  dispatch => ({
    loadProducts() {
      dispatch(createLoadProducts());
    },
    loadProductCategories() {
      dispatch(createLoadProductCategories());
    },
    initForm(tile) {
      dispatch(initialize(formName, tile));
    },
    saveTile(tile) {
      dispatch(createSaveTile(tile));
    },
  })
)(reduxForm({
  form: formName,
})(withRouter(HomeTileForm)));
