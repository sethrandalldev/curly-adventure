import React, { useState } from "react";
import { Button, IconButton, TextField, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { setSelected } from "../features/pages";
import EditIcon from "@material-ui/icons/Edit";
import EditNotebook from "./EditNotebook";
import NewPage from "./NewPage";
import PageSearch from "./PageSearch";
import { Notebook } from "../types";
import { RootState } from "../app/store";
import { Page } from "../types";

const useStyles = makeStyles({
  sidebar: {
    width: "400px",
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
  editButton: {
    color: "#ffffff",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  sidebarBody: {},
  search: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    margin: "10px 0",
  },
});

interface NotebookSidebarProps {
  notebook: Notebook;
}

function NotebookSidebar({ notebook }: NotebookSidebarProps) {
  const [selectedMenuItem, setSelectedMenuItem] = useState("pages");
  const classes = useStyles();
  const pages: Array<Page> = useSelector(
    (state: RootState) => state.pages.value
  ).filter((page: Page) => page.notebookId === notebook._id);
  const selectedPage: Page | null = useSelector(
    (state: RootState) => state.pages.selected
  );
  const dispatch = useDispatch();
  const [isNotebookModalOpen, setIsNotebookModalOpen] = useState(false);
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const renderPages = () => {
    return pages
      .filter((page) =>
        page.title.toLowerCase().includes(searchInput.toLowerCase())
      )
      .map((page) => {
        return (
          <p
            className={
              selectedPage?._id === page._id
                ? classes.selectedPage
                : classes.page
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
        <div className={classes.row}>
          <h1 className={classes.title}>{notebook.title}</h1>
          <Tooltip title="Edit Notebook">
            <IconButton onClick={() => setIsNotebookModalOpen(true)}>
              <EditIcon className={classes.editButton} />
            </IconButton>
          </Tooltip>
        </div>
        <h4 className={classes.description}>{notebook.description}</h4>
        <div>
          <TextField
            className={classes.search}
            id="page-search"
            placeholder="Search"
            variant="outlined"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button variant="contained" onClick={() => setIsPageModalOpen(true)}>
            New Page
          </Button>
        </div>
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
      <EditNotebook
        isOpen={isNotebookModalOpen}
        handleClose={() => setIsNotebookModalOpen(false)}
        notebook={notebook}
      />
      <NewPage
        isOpen={isPageModalOpen}
        handleClose={() => setIsPageModalOpen(false)}
        notebook={notebook}
      />
    </div>
  );
}

export default NotebookSidebar;
