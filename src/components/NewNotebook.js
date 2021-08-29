import React, { useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { addNotebookToUser } from "../api/api";
import { useHistory } from "react-router-dom";

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

function NewNotebook({ handleClose, isOpen }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const classes = useStyles();
  const user = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : "";
  const history = useHistory();

  const handleSubmit = () => {
    addNotebookToUser({
      userId: user.id,
      title,
      description,
    }).then((notebook) => {
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
