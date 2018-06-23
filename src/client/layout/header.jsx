import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import ShoppingCartIcon from '../shoppingcart/shoppingCartIcon.jsx';

const Title = styled(Link)`
  flex: 1;
  text-decoration: none;
  color: inherit;
`;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

const Header = ({
  classes,
  toggleDrawer,
}) => (
  <AppBar
    position="fixed"
    className={classes.appBar}
  >
    <Toolbar>
      <IconButton color="inherit" aria-label="Menu" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Title to="/">
        <Typography variant="title" color="inherit">
          {APP.TITLE}
        </Typography>
      </Title>
      <ShoppingCartIcon />
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  toggleDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
