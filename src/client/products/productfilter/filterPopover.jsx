import RaisedButton from 'material-ui/RaisedButton';
import { grey200, grey800 } from 'material-ui/styles/colors';
import CloseIcon from 'material-ui/svg-icons/content/clear';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { mdMinSize, xsMaxSize } from '../../theme';

const Popover = styled.div`
  position: fixed;
  z-index: 1101;
  background-color: rgba(255, 255, 255, 0.8);
  overflow-y: auto;
  left: 0;
  width: 100%;
  
  @media screen and (min-width: ${mdMinSize}) {
    animation: .25s ease-in 0s slideDown;
    animation-fill-mode: both;
  }
  
  @media screen and (max-width: ${xsMaxSize}) {
    animation: .25s ease-in 0s slideUp;
    bottom: 0;
  }
  
  @keyframes slideDown {
    from { bottom: 100%; }
    to { bottom: 0; }
  }
  
  @keyframes slideUp {
    from { top: 100%; }
    to { top: 0; }
  }
`;

const PopoverInlay = styled.div`
  position: relative;
  padding: 20px 20px 60px;
  background-color: #FFF;
  max-width: 900px;
`;

const FilterButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #FFF;
  width: 100%;
  max-width: 900px;
  padding: 5px 0;
  z-index: 2;
  
  animation: .15s ease-in .45s delayFadeIn;
  animation-fill-mode: both;
  
  @keyframes delayFadeIn {
    from { bottom: -50px; }
    to { bottom: 0; }
  }
`;

const PopoverTitleContainer = styled.div`
  background-color: ${grey200};
  display: flex;
  align-items: center;

  @media screen and (min-width: ${mdMinSize}) {
    display: none;
  }
`;

const PopoverTitle = styled.h2`
  margin: 0;
  padding: 0 20px;
  font-weight: 400;
  flex: 1 1 auto;
  color: ${grey800};
`;

const PopoverCloseContainer = styled.div`
  flex: none;
  padding: 15px;
  border-left: 1px solid ${grey800};
  cursor: pointer;
`;

const FilterButton = styled(RaisedButton)`
  margin-right: 20px;
`;

const ResetButton = styled(RaisedButton)`
  margin-right: 5px;
`;

const FilterPopover = ({
  children,
  toggleFilterView,
  resetFilter,
  top,
}) => (
  <Popover
    style={{
      top: `${top}px`,
    }}
  >
    <PopoverTitleContainer>
      <PopoverTitle>
        <FormattedMessage id="PRODUCT_FILTER.TITLE" />
      </PopoverTitle>
      <PopoverCloseContainer onClick={toggleFilterView}>
        <CloseIcon color={grey800} />
      </PopoverCloseContainer>
    </PopoverTitleContainer>
    <PopoverInlay>
      {children}
      <FilterButtonContainer>
        <ResetButton
          secondary
          label={<FormattedMessage id="PRODUCT_FILTER.RESET_FILTER" />}
          onClick={resetFilter}
        />
        <FilterButton
          primary
          label={<FormattedMessage id="PRODUCT_FILTER.BACK" />}
          onClick={toggleFilterView}
        />
      </FilterButtonContainer>
    </PopoverInlay>
  </Popover>
);

FilterPopover.propTypes = {
  top: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  toggleFilterView: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
};

export default FilterPopover;
