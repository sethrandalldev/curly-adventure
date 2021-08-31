import React, { useEffect, useState } from "react";
import NotebookSidebar from "../components/NotebookSidebar";
import { makeStyles } from "@material-ui/core/styles";
import { getPagesByNotebook } from "../api/api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Page from "../components/Page";

const useStyles = makeStyles((theme) => ({
  notebook: {
    height: "100%",
    top: 0,
    bottom: 0,
    display: "flex",
  },
}));

function Notebook() {
  const classes = useStyles();
  const [pages, setPages] = useState([]);
  const { id } = useParams();
  const filteredNotebooks = useSelector(
    (state) => state.notebooks.value
  ).filter((current) => current._id === id);
  const notebook = filteredNotebooks.length > 0 ? filteredNotebooks[0] : null;

  useEffect(() => {
    if (notebook) {
      getPagesByNotebook(notebook._id).then((pagesData) => {
        setPages(pagesData.data);
      });
    }
  }, []);
  console.log(pages);
  return (
    <div>
      <div className={classes.notebook}>
        <NotebookSidebar notebook={notebook} />
        <Page />
      </div>
    </div>
  );
}

export default Notebook;
