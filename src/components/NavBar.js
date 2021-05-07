import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff',
    '& :visited': {
      color: '#ffffff !important'
    }
  }
}));

function NavBar() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography align="left" variant="h6" className={classes.title}>
              <Link to="/" className={classes.link}>
                Home
              </Link>
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
  );
}

export default NavBar;