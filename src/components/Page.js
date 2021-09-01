import React, { useState, useEffect } from "react";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PageBar from "../components/PageBar";
import { useSelector, useDispatch } from "react-redux";
import { patchPage } from "../api/api";
import { updatePage } from "../features/pages";

const useStyles = makeStyles({
  page: {
    "&:after": {
      border: "none",
    },
    width: "100%",
  },
  textContainer: {
    width: "100%",
    padding: 10,
  },
});

function Page() {
  const classes = useStyles();
  const selectedPage = useSelector((state) => state.pages.selected);
  const [text, setText] = useState(selectedPage?.body);
  const dispatch = useDispatch();

  useEffect(() => {
    setText(selectedPage?.body);
  }, [selectedPage]);

  const handleClick = () => {
    patchPage({
      id: selectedPage._id,
      title: selectedPage.title,
      body: text,
    }).then((page) => {
      dispatch(updatePage({ id: selectedPage._id, body: text }));
    });
  };

  return (
    <div className={classes.page}>
      <PageBar handleClick={handleClick} />
      <InputBase
        className={classes.textContainer}
        multiline
        value={text}
        placeholder="Enter text here..."
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

export default Page;
