import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Theme, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/user";
import { setNotebooks } from "../features/notebooks";
import { RootState } from "../app/store";

const useStyles = makeStyles((theme: Theme) => ({
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
  const userFirst = useSelector((state: RootState) => state.user.firstName);

  const onClick = userFirst.length
    ? () => {
        dispatch(setUser({ id: "", firstName: "", lastName: "", email: "" }));
        dispatch(setNotebooks);
      }
    : () => {};

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography align="left" variant="h6" className={classes.title}>
            <Link to="/" className={classes.titleLink}>
              Home
            </Link>
          </Typography>
          <Link to="/login" className={classes.link} onClick={onClick}>
            Logout
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
