import React, { useEffect, useState } from "react";
import { getNotebooksByUser } from "../api/api";
import NotebookListHeader from "./NotebookListHeader";
import NotebookListItem from "./NotebookListItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    width: 500,
    margin: "0 auto",
  },
});

function NotebookList() {
  let user = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null;
  const [notebooks, setNotebooks] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getNotebooksByUser(user.id).then((notebooksData) => {
      console.log(notebooksData);
      sessionStorage.setItem("notebooks", JSON.stringify(notebooksData.data));
      setNotebooks(notebooksData.data);
    });
  }, []);

  return (
    <div className={classes.list}>
      <NotebookListHeader />
      {notebooks.map((notebook) => {
        return <NotebookListItem notebook={notebook} />;
      })}
    </div>
  );
}

export default NotebookList;
