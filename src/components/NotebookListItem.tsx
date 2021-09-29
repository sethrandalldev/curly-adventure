import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteNotebook } from "../api/api";
import { removeNotebook } from "../features/notebooks";
import { useDispatch } from "react-redux";
import { Notebook } from "../types";
import ConfirmationModal from "./ConfirmationModal";

const useStyles = makeStyles({
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#efefef",
    },
  },
});

interface NotebookListItemProps {
  notebook: Notebook;
}

function NotebookListItem({ notebook }: NotebookListItemProps) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = (e: any) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    deleteNotebook(notebook._id, notebook.userId).then(() => {
      dispatch(removeNotebook(notebook._id));
    });
    setOpen(false);
  };

  return (
    <TableRow
      className={classes.row}
      onClick={() => history.push(`/notebook/${notebook._id}`)}
    >
      <TableCell>{notebook.title}</TableCell>
      <TableCell>{notebook.description}</TableCell>
      <TableCell>
        <Tooltip title="Delete Notebook">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <ConfirmationModal
          title="Delete this notebook?"
          open={open}
          handleConfirm={handleDelete}
          handleClose={handleClose}
        />
      </TableCell>
    </TableRow>
  );
}

export default NotebookListItem;
