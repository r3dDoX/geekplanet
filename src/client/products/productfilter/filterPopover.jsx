import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Popover = styled.div`
  position: fixed;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
  overflow-y: auto;
  left: 0;
  width: 100%;
  animation: .25s linear 0s slideDown;
  animation-fill-mode: both;
  
  @keyframes slideDown {
    from { bottom: 100%; }
    to { bottom: 0; }
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
  
  animation: .15s ease-in .45s delayFadeIn;
  animation-fill-mode: both;
  
  @keyframes delayFadeIn {
    from { bottom: -50px; }
    to { bottom: 0; }
  }
`;

const FilterButton = styled(RaisedButton)`
  margin-right: 20px;
`;

const FilterPopover = ({
  anchorElementRect,
  children,
}) => (
  <Popover
    style={{
      top: `${anchorElementRect.top + anchorElementRect.height + 5}px`,
    }}
  >
    <PopoverInlay>
      {children}
      <FilterButtonContainer>
        <FilterButton
          primary
          label="Filter speichern"
        />
      </FilterButtonContainer>
    </PopoverInlay>
  </Popover>
);

FilterPopover.propTypes = {
  anchorElementRect: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default FilterPopover;
