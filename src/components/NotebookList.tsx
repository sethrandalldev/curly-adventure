import React, { useEffect, useState } from "react";
import { getNotebooksByUser } from "../api/api";
import NotebookListItem from "./NotebookListItem";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { addNotebooks } from "../features/notebooks";
import NewNotebook from "./NewNotebook";
import { RootState } from "../app/store";
import { Notebook } from "../types";

const useStyles = makeStyles({
  list: {
    width: 500,
    margin: "50px auto",
  },
  columnHeader: {
    fontWeight: "bold",
    width: 220,
  },
  table: {
    border: "3px solid #efefef",
    marginTop: 15,
  },
  searchInput: {
    width: 220,
  },
  header: {
    textAlign: "left",
  },
  tableHead: {},
});

function NotebookList() {
  const userId: string = useSelector((state: RootState) => state.user.id);
  const notebooks: Array<Notebook> = useSelector(
    (state: RootState) => state.notebooks.value
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalToggle = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    if (notebooks.length === 0) {
      getNotebooksByUser(userId).then((notebooksData: any) => {
        dispatch(addNotebooks(notebooksData.data));
      });
    }
  }, []);

  return (
    <div className={classes.list}>
      <TextField
        className={classes.searchInput}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search for Notebook"
        variant="outlined"
      />
      <Tooltip title="Create Notebook">
        <IconButton onClick={modalToggle}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <NewNotebook isOpen={isModalOpen} handleClose={modalToggle} />
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.columnHeader}>Title</TableCell>
            <TableCell className={classes.columnHeader}>Description</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notebooks.length ? (
            notebooks.map((notebook) => {
              return (
                notebook.title.toLowerCase().includes(text.toLowerCase()) && (
                  <NotebookListItem notebook={notebook} key={notebook._id} />
                )
              );
            })
          ) : (
            <TableRow>
              <TableCell>No Notebooks Created</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default NotebookList;
