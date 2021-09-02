import React, { useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { addPage } from "../features/pages";
import { addNotebookPage } from "../features/notebooks";
import { addPageToNotebook } from "../api/api";
import { Notebook } from "../types";

interface NewPageProps {
  handleClose: () => void;
  isOpen: boolean;
  notebook: Notebook;
}

const useStyles = makeStyles((theme) => ({
  modalContainer: {},
  modal: {
    backgroundColor: "#ffffff",
    width: "400px",
    margin: "200px auto",
    borderRadius: "15px",
    padding: "25px",
    "&:focus": {
      border: "none",
      outline: "none",
    },
  },
  header: {
    margin: "5px 0",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));

function NewPage({ handleClose, isOpen, notebook }: NewPageProps) {
  const [title, setTitle] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    addPageToNotebook(notebook._id, title).then((page) => {
      dispatch(addPage(page));
      dispatch(addNotebookPage({ id: notebook._id, page }));
      handleClose();
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="new-page"
      aria-describedby="create a new page"
      className={classes.modalContainer}
    >
      <div className={classes.modal}>
        <h2 className={classes.header}>New Page</h2>
        <div className={classes.inputContainer}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            label="Title"
          />
          <br />
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default NewPage;
