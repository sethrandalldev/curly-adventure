import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

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
    margin: "5px 0",
  },
  header: {
    padding: 15,
  },
  sidebarMenu: {
    display: "flex",
    width: "100%",
    margin: "50px 0",
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
}));

function NotebookSidebar({ notebook }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState("pages");
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(null);

  return (
    <div className={classes.sidebar}>
      <div className={classes.header}>
        <h1 className={classes.title}>{notebook.title}</h1>
        <h4 className={classes.description}>{notebook.description}</h4>
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
      <div className={classes.sidebarBody}></div>
    </div>
  );
}

export default NotebookSidebar;
