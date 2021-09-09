import React, { useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { patchNotebook } from "../api/api";
import { useDispatch } from "react-redux";
import { updateNotebook } from "../features/notebooks";
import { Notebook } from "../types";

interface EditNotebookProps {
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

function EditNotebook({ handleClose, isOpen, notebook }: EditNotebookProps) {
  const [title, setTitle] = useState(notebook.title);
  const [description, setDescription] = useState(notebook.description);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    patchNotebook({
      notebookId: notebook._id,
      title,
      description,
    }).then((updatedNotebook) => {
      dispatch(
        updateNotebook({ notebookId: notebook._id, title, description })
      );
      handleClose();
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="edit-notebook"
      aria-describedby="edit a notebook"
      className={classes.modalContainer}
    >
      <div className={classes.modal}>
        <h2 className={classes.header}>Edit Notebook</h2>
        <div className={classes.inputContainer}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            label="Title"
          />
          <br />
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            label="Description"
          />
          <br />
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditNotebook;
