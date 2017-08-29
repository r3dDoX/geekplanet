import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { change } from 'redux-form';
import styled from 'styled-components';
import { createFilterProducts, createResetFilter } from '../actions';
import { formName } from '../products/productfilter/productFilter.jsx';
import { backgroundColor } from '../theme';

const SearchBar = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: ${backgroundColor};
  padding: 5px 20px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 250px;
  max-width: 350px;
`;

const SearchInput = styled.input`
  margin: 5px 0px 5px 0;
  padding: 5px 10px;
  border: none;
  border-radius: 20px;
  flex: 1 1 auto;
  font-size: 1em;
  appearance: none;
  outline: none;
`;

const SearchButton = styled(IconButton)`
  color: #FFF;
  padding-right: 0 !important;
`;

const HomeSearch = ({
  history,
  filterProducts,
  intl,
}) => (
  <SearchBar>
    <iframe
      title="rememberHelper"
      name="remember"
      style={{ display: 'none' }}
      src="about:blank"
    />
    <SearchForm
      name="searchForm"
      target="remember"
      action="about:blank"
      onSubmit={() => {
        filterProducts(document.forms.searchForm.search.value);
        history.push('/products');
      }}
    >
      <SearchInput
        name="search"
        placeholder={intl.formatMessage({ id: 'COMMON.SEARCH' })}
        type="search"
      />
      <SearchButton type="submit">
        <SearchIcon color="white" />
      </SearchButton>
    </SearchForm>
  </SearchBar>
);

HomeSearch.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  intl: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  filterProducts: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  dispatch => ({
    filterProducts(filterString) {
      dispatch(createResetFilter());
      dispatch(change(formName, 'filterString', filterString));
      dispatch(createFilterProducts(filterString));
    },
  })
)(withRouter(injectIntl(HomeSearch)));

