import { grey700 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import SmallTextField from '../../formHelpers/smallTextField.jsx';
import { laMinSize, mdMinSize } from '../../theme';

export const formName = 'productFilter';

const FilterContainer = styled.div`
  background: #FFF;
  padding: 10px 20px;
  box-shadow: 0 0 10px -2px rgba(0, 0, 0, 0.3);
  max-height: 68px;
  
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

class ProductFilter extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillUpdate(nextProps) {
    if (nextProps.filterShown) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'visible';
    }
  }

  render() {
    const { history } = this.props;

    return (
      <FilterContainer>
        <Field
          component={SmallTextField}
          name="filterString"
          label={<FormattedMessage id="PRODUCT_FILTER.FILTERSTRING_PLACEHOLDER" />}
          floatingLabelStyle={styles.filterHint}
          underlineStyle={styles.filterHint}
          onKeyUp={({ target }) => debounce(() => {
            const query = queryString.parse(history.location.search);

            query.filterString = target.value;

            history.push(`?${queryString.stringify(query)}`);
          })}
          type="text"
        />
      </FilterContainer>
    );
  }
}

ProductFilter.propTypes = {
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
