import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { backgroundColor } from '../theme';

const SearchBar = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: ${backgroundColor};
  padding: 5px 20px;
`;

const SearchInlay = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 250px;
  max-width: 350px;
`;

const SearchInput = styled.input`
  margin: 5px 0 5px 0;
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
  intl,
}) => {
  function submitFilterString() {
    const query = { search: document.getElementById('search').value };
    history.push(`/products?${queryString.stringify(query)}`);
  }

  return (
    <SearchBar itemScope itemType="http://schema.org/WebSite" role="search">
      <meta itemProp="url" content={APP.BASE_URL} />
      <SearchInlay itemProp="potentialAction" itemScope itemType="http://schema.org/SearchAction">
        <meta itemProp="target" content={`${APP.BASE_URL}/products?search={search_term_string}`} />
        <SearchInput
          id="search"
          placeholder={intl.formatMessage({ id: 'COMMON.SEARCH' })}
          type="search"
          itemProp="query-input"
          name="search_term_string"
          required
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              submitFilterString();
            }
          }}
        />
        <SearchButton type="submit" onClick={submitFilterString}>
          <SearchIcon color="white" />
        </SearchButton>
      </SearchInlay>
    </SearchBar>
  );
};

HomeSearch.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  intl: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(injectIntl(HomeSearch));

