import React, { useState } from "react";
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    margin: "100px auto",
    padding: "15px",
    borderRadius: "25px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  },
  textfield: {
    width: "250px",
  },
  submitButton: {
    color: "#FFF",
    margin: "25px 0 40px",
  },
  createLink: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
  book: {
    display: "flex",
  },
  formControl: {
    width: "250px",
  },
}));

function Note({ userId, booksData, setBooksData }) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [readStatus, setReadStatus] = useState("Unread");

  const handleInputChange = (e, setValue) => {
    const { value } = e.target;
    setValue(value);
  };

  // const formSubmit = (e) => {
  //   e.preventDefault();
  //   // const book = addBookToUserReading({
  //   //   userId,
  //   //   title,
  //   //   author,
  //   //   read: readStatus,
  //   //   created: new Date().getTime(),
  //   // });
  //   book.then(function (val) {
  //     if (val) {
  //       setBooksData({
  //         books: [...booksData.books, val.data.book],
  //         userBooks: [...booksData.userBooks, val.data.userBook],
  //       });
  //     }
  //   });
  // };

  return (
    <div className={classes.formContainer}>
      <h1>Add Book</h1>
      <form className={classes.form} onSubmit={() => {}}>
        <TextField
          className={classes.textfield}
          required
          label="Title"
          value={title}
          onChange={(e) => handleInputChange(e, setTitle)}
        />
        <TextField
          className={classes.textfield}
          required
          label="Author"
          value={author}
          onChange={(e) => handleInputChange(e, setAuthor)}
        />
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Read Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={readStatus}
            onChange={(e) => setReadStatus(e.target.value)}
          >
            <MenuItem value={10}>Unread</MenuItem>
            <MenuItem value={20}>Currently Reading</MenuItem>
            <MenuItem value={30}>Finished</MenuItem>
          </Select>
        </FormControl>

        <br />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.submitButton}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Note;
