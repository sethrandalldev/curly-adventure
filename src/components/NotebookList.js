import React, { useEffect } from "react";
import { getNotebooksByUser } from "../api/api";
import NotebookListHeader from "./NotebookListHeader";
import NotebookListItem from "./NotebookListItem";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { addNotebooks } from "../features/notebooks";

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
});

function NotebookList() {
  const userId = useSelector((state) => state.user.id);
  const notebooks = useSelector((state) => state.notebooks.value);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (notebooks.length === 0) {
      getNotebooksByUser(userId).then((notebooksData) => {
        dispatch(addNotebooks(notebooksData.data));
      });
    }
  }, []);

  return (
    <div className={classes.list}>
      <NotebookListHeader />
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
                <NotebookListItem notebook={notebook} key={notebook._id} />
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
