import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import NewNotebook from "./NewNotebook";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    display: "flex",
    textAlign: "left",
  },
  title: {
    width: "50%",
  },
  description: {
    width: "50%",
  },
});

function NotebookListHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useStyles();
  const modalToggle = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <div className={classes.header}>
        <h1>My Notebooks</h1>
        <IconButton onClick={modalToggle}>
          <AddIcon />
        </IconButton>
        <NewNotebook isOpen={isModalOpen} handleClose={modalToggle} />
      </div>
      <div className={classes.header}>
        <h2 className={classes.title}>Title</h2>
        <h2 className={classes.description}>Description</h2>
      </div>
    </div>
  );
}

export default NotebookListHeader;
