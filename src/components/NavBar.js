import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/user";
import { setNotebooks } from "../features/notebooks";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#FFF",
    "& :visited": {
      color: "#FFF !important",
    },
  },
  title: {
    flexGrow: 1,
  },
  titleLink: {
    textDecoration: "none",
    color: "#FFF",
    "& :visited": {
      color: "#FFF !important",
    },
  },
  link: {
    textDecoration: "none",
    color: "#000",
    "& :visited": {
      color: "#000 !important",
    },
  },
}));

function NavBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const userFirst = useSelector((state) => state.user.firstName);
  const onClick = userFirst.length
    ? () => {
        dispatch(setUser({ id: "", firstName: "", lastName: "", email: "" }));
        dispatch(setNotebooks);
      }
    : () => {};

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography align="left" variant="h6" className={classes.title}>
            <Link to="/" className={classes.titleLink}>
              Home
            </Link>
          </Typography>
          <Button
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
            className={classes.menuButton}
          >
            <Typography align="left" variant="h6" className={classes.title}>
              {userFirst}
            </Typography>
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/profile" className={classes.link}>
                My Account
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/login" className={classes.link} onClick={onClick}>
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
