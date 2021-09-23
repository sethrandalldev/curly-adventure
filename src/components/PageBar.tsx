import { Button, Tooltip, IconButton, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import EditPage from "./EditPage";
import { Notebook } from "../types";

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

interface PageBarProps {
  handleClick: () => void;
  notebook: Notebook;
}

const PageBar = ({ handleClick, notebook }: PageBarProps) => {
  const classes = useStyles();
  const selectedPage = useSelector((state: RootState) => state.pages.selected);
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [title, setTitle] = useState(selectedPage?.title);

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
      <Tooltip title="Edit Page Title">
        <IconButton onClick={() => setIsPageModalOpen(true)}>
          <EditIcon className={classes.editButton} />
        </IconButton>
      </Tooltip>
      <Button
        className={classes.saveButton}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Save
      </Button>
      {selectedPage ? (
        <EditPage
          notebook={notebook}
          isOpen={isPageModalOpen}
          handleClose={() => setIsPageModalOpen(false)}
          page={selectedPage}
        />
      ) : null}
    </div>
  );
};

export default PageBar;
