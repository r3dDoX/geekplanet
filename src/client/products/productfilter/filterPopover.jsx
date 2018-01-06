import RaisedButton from 'material-ui/RaisedButton';
import { grey200, grey800 } from 'material-ui/styles/colors';
import CloseIcon from 'material-ui/svg-icons/content/clear';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { mdMinSize, xsMaxSize } from '../../theme';

const FilterButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  left: 0;
  bottom: -50px;
  background-color: #FFF;
  width: 100%;
  max-width: 900px;
  padding: 5px 0;
  z-index: 2;
`;

const Popover = styled.div`
  position: fixed;
  z-index: 1101;
  background-color: rgba(255, 255, 255, 0.8);
  overflow-y: auto;
  left: 0;
  width: 100%;
  transition: bottom .25s ease-in, top .25s ease-in, opacity .25s ease-in;
  
  &.slide-in ${FilterButtonContainer} {
    transition: bottom .15s ease-in .45s;
    bottom: 0;
  }
  
  &.slide-out {
    opacity: 0;
  }
  
  @media screen and (min-width: ${mdMinSize}) {
    bottom: 100%;
    
    &.slide-in {
      bottom: 0;
    }
  }
  
  @media screen and (max-width: ${xsMaxSize}) {
    bottom: 0;
    top: 100%;
    
    &.slide-in {
      top: 0;
    }
  }
`;

const PopoverInlay = styled.div`
  position: relative;
  height: 100%;
  padding: 20px 20px 60px;
  background-color: #FFF;
  max-width: 900px;
  overflow-y: auto;
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

const ResetButton = styled(RaisedButton)`
  margin-right: 20px;
`;

const FilterButton = styled(RaisedButton)`
  margin-right: 5px;
`;

const FilterPopover = ({
  children,
  toggleFilterView,
  resetFilter,
  top,
  filterShown,
}) => (
  <Popover
    style={top ? { top: `${top}px` } : null}
    className={filterShown ? 'slide-in' : 'slide-out'}
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
        <FilterButton
          primary
          label={<FormattedMessage id="PRODUCT_FILTER.APPLY" />}
          onClick={toggleFilterView}
        />
        <ResetButton
          secondary
          label={<FormattedMessage id="PRODUCT_FILTER.RESET_FILTER" />}
          onClick={resetFilter}
        />
      </FilterButtonContainer>
    </PopoverInlay>
  </Popover>
);

FilterPopover.propTypes = {
  top: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  filterShown: PropTypes.bool.isRequired,
  toggleFilterView: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
};

export default FilterPopover;
