import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteNotebook } from "../api/api";
import { removeNotebook } from "../features/notebooks";
import { useDispatch } from "react-redux";
import { Notebook } from "../types";

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteNotebook(notebook._id, notebook.userId).then(() => {
      dispatch(removeNotebook(notebook._id));
    });
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
          <IconButton onClick={(e) => handleClick(e)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

export default NotebookListItem;
