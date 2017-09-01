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
  padding: 20px;
  background-color: #FFF;
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
    <PopoverInlay
      style={{
        maxWidth: `${anchorElementRect.left + anchorElementRect.width + 5}px`,
      }}
    >
      {children}
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
