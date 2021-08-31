import React, { useState } from "react";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PageBar from "../components/PageBar";

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

function Note() {
  const [text, setText] = useState("");
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <PageBar />
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

export default Note;
