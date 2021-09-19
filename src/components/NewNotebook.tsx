import React, { useState } from "react";
import { Modal, TextField, Button, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { addNotebookToUser } from "../api/api";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addNotebooks } from "../features/notebooks";
import { RootState } from "../app/store";

const useStyles = makeStyles((theme: Theme) => ({
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

interface NewNotebookProps {
  handleClose: () => void;
  isOpen: boolean;
}

function NewNotebook({ handleClose, isOpen }: NewNotebookProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const classes = useStyles();
  const userId = useSelector((state: RootState) => state.user.id);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    addNotebookToUser({
      userId: userId,
      title,
      description,
    }).then((notebook) => {
      dispatch(addNotebooks([notebook]));
      if (notebook._id) {
        history.push(`/notebook/${notebook._id}`);
      }
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="new-notebook"
      aria-describedby="create a new notebook"
      className={classes.modalContainer}
    >
      <div className={classes.modal}>
        <h2 className={classes.header}>New Notebook</h2>
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
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default NewNotebook;
