import React, { useState } from 'react';
import { Switch, TextField, Button, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createBook } from '../api/api';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    margin: '100px auto',
    padding: '15px',
    borderRadius: '25px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
  },
  textfield: {
    width: '250px'
  },
  submitButton: {
    color: '#FFF',
    margin: '25px 0 40px'
  },
  createLink: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  book: {
    display: 'flex'
  }
}));

function BookForm({ user, booksData, setBooksData }) {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [read, setRead] = useState(true);

  const handleInputChange = (e, setValue) => {
    const {value} = e.target;
    setValue(value);
  }

  const handleReadChange = (e) => {
    setRead(e.target.checked);
  }

  const formSubmit = (e) => {
    e.preventDefault();
    const book = createBook({
      title,
      author,
      read,
      userId: user.id
    });
    book.then(function (val) {
      if (val) {
        setBooksData({ books: [...booksData.books, val.data.book], userBooks: [...booksData.userBooks, val.data.userBook] });
      }
    });
  }

  return (
    <div className={classes.formContainer}>
      <h1>Add Book</h1>
      <form className={classes.form} onSubmit={formSubmit}>
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
        <FormControlLabel
          control={
            <Switch
              checked={read}
              onChange={handleReadChange}
              name="read"
              inputProps={{ 'aria-label': 'secondary checkbox'}}
            />
          }
          label="Read?"
        />
        
        <br />
        <Button type="submit" variant="contained" color="secondary" className={classes.submitButton}>Submit</Button>
      </form>
    </div>
  );
}

export default BookForm;
