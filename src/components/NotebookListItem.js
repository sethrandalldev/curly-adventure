import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  item: {
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    textAlign: "left",
    "&:hover": {
      backgroundColor: "#efefef",
    },
  },
  title: {
    margin: 0,
    width: "50%",
  },
  description: {
    margin: 0,
    width: "50%",
  },
});

function NotebookListItem({ notebook }) {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div
      className={classes.item}
      key={notebook.id}
      onClick={() => history.push(`/notebook/${notebook._id}`)}
    >
      <h3 className={classes.title}>{notebook.title}</h3>
      <p className={classes.description}>{notebook.description}</p>
    </div>
  );
}

export default NotebookListItem;
