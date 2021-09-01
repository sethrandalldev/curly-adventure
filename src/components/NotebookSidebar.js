import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { addPage, setSelected } from "../features/pages";
import { addNotebookPage } from "../features/notebooks";
import { addPageToNotebook } from "../api/api";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: "360px",
    backgroundColor: "#282C34",
    color: "#ffffff",
    padding: 0,
    height: "calc(100vh - 64px)",
  },
  title: {
    margin: 0,
    textAlign: "left",
  },
  description: {
    fontWeight: "normal",
    textAlign: "left",
    margin: "5px 0 20px",
  },
  header: {
    padding: 15,
    textAlign: "left",
  },
  sidebarMenu: {
    display: "flex",
    width: "100%",
    margin: "20px 0 0",
    borderBottom: "3px solid #ffffff",
  },
  sidebarMenuItem: {
    width: "100%",
    textAlign: "center",
    border: "1px solid #ffffff",
    borderRadius: "10px 10px 0 0",
    margin: "0 5px",
    borderBottom: 0,
    fontWeight: "light",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  selectedSidebarMenuItem: {
    width: "100%",
    textAlign: "center",
    border: "3px solid #ffffff",
    borderRadius: "10px 10px 0 0",
    margin: "0 5px",
    borderBottom: 0,
    fontWeight: "bold",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  page: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#393D45",
    },
    padding: 10,
    margin: 0,
  },
  selectedPage: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#393D45",
    },
    padding: 10,
    fontWeight: "bold",
    margin: 0,
  },
}));

function NotebookSidebar({ notebook }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState("pages");
  const classes = useStyles();
  const pages = useSelector((state) => state.pages.value).filter(
    (page) => page.notebookId === notebook._id
  );
  const selectedPage = useSelector((state) => state.pages.selected);
  const dispatch = useDispatch();

  const handleClick = () => {
    addPageToNotebook(notebook._id).then((page) => {
      dispatch(addPage(page));
      dispatch(addNotebookPage({ id: notebook._id, page }));
    });
  };

  const renderPages = () => {
    return pages.map((page) => {
      return (
        <p
          className={
            selectedPage?._id === page._id ? classes.selectedPage : classes.page
          }
          onClick={() =>
            dispatch(
              setSelected(pages[pages.findIndex((x) => x._id === page._id)])
            )
          }
        >
          {page.title || "Untitled"}
        </p>
      );
    });
  };

  const renderSettings = () => {
    return <p>notebook settings</p>;
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.header}>
        <h1 className={classes.title}>{notebook.title}</h1>
        <h4 className={classes.description}>{notebook.description}</h4>
        <Button variant="contained" onClick={handleClick}>
          New Page
        </Button>
      </div>
      <div className={classes.sidebarMenu}>
        <p
          className={
            selectedMenuItem === "pages"
              ? classes.selectedSidebarMenuItem
              : classes.sidebarMenuItem
          }
          onClick={() => setSelectedMenuItem("pages")}
        >
          Pages
        </p>
        <p
          className={
            selectedMenuItem === "notebook settings"
              ? classes.selectedSidebarMenuItem
              : classes.sidebarMenuItem
          }
          onClick={() => setSelectedMenuItem("notebook settings")}
        >
          Settings
        </p>
      </div>
      <div className={classes.sidebarBody}>
        {selectedMenuItem === "pages" ? renderPages() : renderSettings()}
      </div>
    </div>
  );
}

export default NotebookSidebar;
