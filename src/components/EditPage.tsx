import React, { useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { patchPage } from "../api/api";
import { useDispatch } from "react-redux";
import { updatePage, setSelected } from "../features/pages";
import { Notebook, Page } from "../types";
import { updateNotebookPage } from "../features/notebooks";

interface EditPageProps {
  handleClose: () => void;
  isOpen: boolean;
  page: Page;
  notebook: Notebook;
}

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

function EditPage({ handleClose, isOpen, page, notebook }: EditPageProps) {
  const [title, setTitle] = useState(page.title);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    patchPage({
      pageId: page._id,
      title,
      body: page.body,
    }).then((updatedPage) => {
      dispatch(updatePage({ pageId: page._id, title, body: page.body }));
      dispatch(
        updateNotebookPage({
          _id: page._id,
          title,
          body: page.body,
          notebookId: notebook._id,
        })
      );
      dispatch(
        setSelected({
          _id: page._id,
          title,
          body: page.body,
          notebookId: notebook._id,
        })
      );
      handleClose();
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="edit-page"
      aria-describedby="edit a page"
      className={classes.modalContainer}
    >
      <div className={classes.modal}>
        <h2 className={classes.header}>Edit Page</h2>
        <div className={classes.inputContainer}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            label="Title"
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

export default EditPage;
