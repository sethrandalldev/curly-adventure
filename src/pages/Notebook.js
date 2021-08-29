import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import NotebookSidebar from "../components/NotebookSidebar";
import { makeStyles } from "@material-ui/core/styles";
import { getPagesByNotebook } from "../api/api";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  notebook: {
    height: "100%",
    top: 0,
    bottom: 0,
  },
}));

function Notebook() {
  const classes = useStyles();
  const user = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : "";
  const [pages, setPages] = useState([]);
  const { id } = useParams();
  const [notebook, setNotebook] = useState("");

  useEffect(() => {
    const notebooks = sessionStorage.getItem("notebooks")
      ? JSON.parse(sessionStorage.getItem("notebooks"))
      : null;
    console.log(notebooks);
    const nb = sessionStorage.getItem("notebooks")
      ? JSON.parse(sessionStorage.getItem("notebooks")).filter(
          (current) => current._id === id
        )[0]
      : null;
    console.log(nb);
    getPagesByNotebook(nb._id).then((pagesData) => {
      console.log(pagesData);
      setPages(pagesData.data);
    });
    setNotebook(nb);
  }, []);

  return (
    <div>
      <NavBar />
      <div className={classes.notebook}>
        <div>
          <NotebookSidebar notebook={notebook} />
        </div>
      </div>
    </div>
  );
}

export default Notebook;
