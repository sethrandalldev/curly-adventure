import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  pageBar: {
    width: "100%",
    backgroundColor: "#efefef",
    padding: "10px 0",
    display: "flex",
    alignItems: "center",
  },
  saveButton: {},
  pageTitle: {
    margin: "0 20px",
  },
});

const PageBar = ({ handleClick }) => {
  const classes = useStyles();
  const selectedPage = useSelector((state) => state.pages.selected);

  return (
    <div className={classes.pageBar}>
      <h2 className={classes.pageTitle}>{selectedPage?.title}</h2>
      <Button
        className={classes.saveButton}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Save
      </Button>
    </div>
  );
};

export default PageBar;
