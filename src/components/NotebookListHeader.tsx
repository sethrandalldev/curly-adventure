import React, { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import NewNotebook from "./NewNotebook";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    display: "flex",
    padding: 0,
    justifyContent: "center",
  },
  headerText: {
    margin: 0,
    paddingRight: 10,
  },
});

function NotebookListHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useStyles();
  const modalToggle = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <div className={classes.header}>
        <h1 className={classes.headerText}>My Notebooks</h1>
        <Tooltip title="Create Notebook">
          <IconButton onClick={modalToggle}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <NewNotebook isOpen={isModalOpen} handleClose={modalToggle} />
      </div>
    </div>
  );
}

export default NotebookListHeader;
