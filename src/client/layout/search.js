import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import SmallTextField from '../formHelpers/smallTextField';
import theme from '../theme';

const SearchInlay = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 250px;
  max-width: 350px;
  
  @media screen and (max-width: ${theme.breakpoints.values.sm - 1}px) {
    display: none;
  }
`;

const MobileSearch = styled.div`
  @media screen and (min-width: ${theme.breakpoints.values.sm}px) {
    display: none;
  }
`;

const SearchPopUp = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  top: 56px;
  left: 0;
  right: 0;
  padding: 12px 20px;
  background-color: #FFF;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
`;

const SearchInput = styled.input`
  margin: 5px 0 5px 0;
  padding: 5px 10px;
  border: none;
  border-radius: 20px;
  flex: 1 1 auto;
  font-size: 1em;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
`;

const SearchButton = styled(IconButton)`
  color: #FFF;
  padding-right: 0 !important;
`;

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popUpOpen: false,
    };
  }

  submitFilterString(filterString) {
    const query = { search: filterString };
    this.props.history.push(`/products?${queryString.stringify(query)}`);
    this.setState({ popUpOpen: false });
  }

  render() {
    const { intl, history } = this.props;

    if (history.location.pathname === '/products') {
      return null;
    }

    return (
      <div itemScope itemType="http://schema.org/WebSite" role="search">
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
                this.submitFilterString(event.target.value);
              }
            }}
          />
          <SearchButton type="submit" onClick={() => this.submitFilterString(document.getElementById('search').value)}>
            <SearchIcon nativeColor="white" />
          </SearchButton>
        </SearchInlay>
        <MobileSearch>
          <SearchButton type="submit" onClick={() => this.setState(prevState => ({ popUpOpen: !prevState.popUpOpen }))}>
            <SearchIcon nativeColor="white" />
          </SearchButton>
          <SearchPopUp open={this.state.popUpOpen}>
            <Field
              component={SmallTextField}
              name="search"
              label={intl.formatMessage({ id: 'PRODUCT_FILTER.FILTERSTRING_PLACEHOLDER' })}
              type="text"
              onBlur={({ target }) => this.submitFilterString(target.value)}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  this.submitFilterString(event.target.value);
                }
              }}
              fullWidth
            />
          </SearchPopUp>
        </MobileSearch>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  intl: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(reduxForm({
  form: 'mainSearch',
  destroyOnUnmount: false,
})(injectIntl(Search)));
