import { makeStyles, TextField } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  search: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    margin: "10px 0",
  },
});

const PageSearch = () => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.search}
      id="page-search"
      placeholder="Search"
      variant="outlined"
    />
  );
};

export default PageSearch;
