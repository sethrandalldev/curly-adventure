import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#FFF',
    '& :visited': {
      color: '#FFF !important'
    }
  },
  title: {
    flexGrow: 1,
  },
  titleLink: {
    textDecoration: 'none',
    color: '#FFF',
    '& :visited': {
      color: '#FFF !important'
    }
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    '& :visited': {
      color: '#000 !important'
    }
  }
}));

function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : '';
  console.log(user);
  const onClick = user ? () => sessionStorage.setItem('user', '') : () => {};

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography align="left" variant="h6" className={classes.title}>
              <Link to="/" className={classes.titleLink}>
                Shelfinator
              </Link>
            </Typography>
            <Button 
              aria-controls="user-menu" 
              aria-haspopup="true"
              onClick={handleMenuClick}
              className={classes.menuButton}
            >
              {user.firstName}
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to='/profile' className={classes.link}>
                  My Account
                </Link>
              </MenuItem>
              <MenuItem
                onClick={handleClose}
              >
                <Link to='/login' className={classes.link} onClick={onClick}>
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
  );
}

export default NavBar;