import AppBar from 'material-ui/AppBar';
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import ShoppingCartIcon from '../shoppingcart/shoppingCartIcon.jsx';


const Title = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledAppBar = styled(AppBar)`
  position: fixed !important;
  z-index: 1;
  top: 0;
`;

const Header = ({
  toggleDrawer,
}) => (
  <StyledAppBar
    title={
      <Title to="/">
        {APP.TITLE}
      </Title>
    }
    onLeftIconButtonClick={toggleDrawer}
    iconElementRight={<ShoppingCartIcon />}
    zDepth={0}
  />
);

Header.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default Header;
