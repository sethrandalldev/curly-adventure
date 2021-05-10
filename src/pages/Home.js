import React, { useState, useEffect } from 'react';
import { Switch, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavBar';
import { createBook, getBooks, getUserBooks } from '../api/api';

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
  form: {
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
  }
}));

function Home() {
  const classes = useStyles();
  let user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [read, setRead] = useState(true);
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    getBooks().then(val => {
      const books = val.data;
      setBooks([...books, ...books]);
    });
    getUserBooks().then(val => {
      const userBooks = val.data;
      setUserBooks([...userBooks, ...userBooks]);
    });
  });

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
        console.log(val);
        setBooks([...books, val.data.book]);
        setUserBooks([...userBooks, val.data.userBook])
      }
    });
  }

  const getBook = (userBook) => {
    return books.find((book) => {
      console.log(book);
      return book._id === userBook.bookId && user.id === userBook.userId;
    });
  }

  return (
    <div>
      <NavBar />
      <h1>Home</h1>
      <p>Hello, { user ? user.name : 'No user logged in' }</p>
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
          <Switch
            checked={read}
            onChange={handleReadChange}
            name="read"
            inputProps={{ 'aria-label': 'secondary checkbox'}}
          />
          <br />
          <Button type="submit" variant="contained" color="secondary" className={classes.submitButton}>Submit</Button>
        </form>
      </div>
      <h3>Books On Your Shelf</h3>
      {userBooks.map((userBook) => {
        const book = getBook(userBook);
        console.log(userBook.read);
        return book ? (
          <div id={userBook._id}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{userBook.read ? 'Read' : 'Unread'}</p>
          </div>
        ) : null;
      })}
    </div>
  );
}

export default Home;