import React, { useState, useEffect } from "react";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PageBar from "./PageBar";
import { useSelector, useDispatch } from "react-redux";
import { patchPage } from "../api/api";
import { updatePage } from "../features/pages";
import { RootState } from "../app/store";
import { Notebook, Page as P } from "../types";

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

interface PageProps {
  notebook: Notebook;
}

function Page({ notebook }: PageProps) {
  const classes = useStyles();
  const selectedPage: P | null = useSelector(
    (state: RootState) => state.pages.selected
  );
  const [text, setText] = useState(selectedPage?.body);
  const dispatch = useDispatch();

  useEffect(() => {
    setText(selectedPage?.body);
  }, [selectedPage]);

  const handleClick = () => {
    if (selectedPage) {
      patchPage({
        id: selectedPage._id,
        title: selectedPage.title,
        body: text,
      }).then((page) => {
        dispatch(
          updatePage({
            id: selectedPage._id,
            body: text,
            title: selectedPage.title,
          })
        );
      });
    }
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
