import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, connect } from "react-redux";
import { RootState } from "../app/store";
import { useState, useEffect } from "react";
import { Page } from "../types";

const useStyles = makeStyles({
  pageBar: {
    width: "100%",
    backgroundColor: "#efefef",
    padding: "10px 0",
    display: "flex",
    alignItems: "center",
  },
  saveButton: {},
  title: {
    margin: " 0 0 0 20px",
    textAlign: "left",
    fontSize: "1.5rem",
  },
  editButton: {
    margin: "0 20px",
  },
  titleInput: {
    fontSize: "1.5rem",
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    selected: state.pages.selected,
  };
};

interface PageBarProps {
  handleClick: () => void;
  selected: Page | null;
}

const PageBar = ({ handleClick, selected }: PageBarProps) => {
  const classes = useStyles();
  const selectedPage = useSelector((state: RootState) => state.pages.selected);
  const [title, setTitle] = useState(selectedPage?.title);

  useEffect(() => {
    setTitle(selected?.title);
  }, [selected]);

  return (
    <div className={classes.pageBar}>
      <TextField
        inputProps={{
          className: classes.titleInput,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        className={classes.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        className={classes.saveButton}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Save
      </Button>
    </div>
  );
};

export default connect(mapStateToProps)(PageBar);
