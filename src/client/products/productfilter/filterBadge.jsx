import Chip from 'material-ui/Chip';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { accent1Color } from '../../theme';

const FilterChip = styled(Chip)`
  margin-left: 10px !important;
`;

const styles = {
  filterChip: {
    lineHeight: '24px',
  },
};

const FilterBadge = ({
  filterCount,
}) => {
  if (!filterCount) {
    return null;
  }

  return (
    <FilterChip
      labelStyle={styles.filterChip}
      labelColor="#FFF"
      backgroundColor={accent1Color}
    >
      {filterCount}
    </FilterChip>
  );
};

FilterBadge.propTypes = {
  filterCount: PropTypes.number.isRequired,
};

export default FilterBadge;
