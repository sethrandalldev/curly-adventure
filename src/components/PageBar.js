import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  pageBar: {
    width: "100%",
    backgroundColor: "#efefef",
    padding: "10px 0",
  },
  saveButton: {},
});

const PageBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.pageBar}>
      <Button
        className={classes.saveButton}
        variant="contained"
        color="primary"
      >
        Save
      </Button>
    </div>
  );
};

export default PageBar;
