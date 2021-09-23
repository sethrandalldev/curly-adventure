import React, { useEffect } from "react";
import NotebookSidebar from "../components/NotebookSidebar";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { getPagesByNotebook } from "../api/api";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Page from "../components/Page";
import { setPages, setSelected } from "../features/pages";
import { RootState } from "../app/store";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  notebook: {
    height: "100%",
    top: 0,
    bottom: 0,
    display: "flex",
  },
}));

function Notebook() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();
  const filteredNotebooks = useSelector(
    (state: RootState) => state.notebooks.value
  ).filter((current) => current._id === id);
  const notebook = filteredNotebooks.length > 0 ? filteredNotebooks[0] : null;

  useEffect(() => {
    if (notebook) {
      getPagesByNotebook(notebook._id).then((pagesData: any) => {
        dispatch(setPages(pagesData.data));
        dispatch(setSelected(pagesData.data[0]));
      });
    }
  }, []);

  return notebook ? (
    <div>
      <div className={classes.notebook}>
        <NotebookSidebar notebook={notebook} />
        <Page notebook={notebook} />
      </div>
    </div>
  ) : (
    <CircularProgress />
  );
}

export default Notebook;
