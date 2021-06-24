import React, { useState } from 'react';
import { 
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableSortLabel,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  table: {
    maxWidth: '1000px',
    margin: '10px auto'
  }
}));

function BooksTable(props) {
  const classes = useStyles();
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('desc');

  const compareBooks = (a, b) => {
    let toReturn;
    switch (orderBy) {
      case 'title':
        const aBook = getBook(a);
        const bBook = getBook(b);
        if (aBook.title > bBook.title) toReturn = 1;
        else if (aBook.title < bBook.title) toReturn = -1;
        else toReturn =  0;
        break;
      case 'author':
        const aAuthor = getBook(a).author.split(' ')[1];
        const bAuthor = getBook(b).author.split(' ')[1];
        if (aAuthor> bAuthor) toReturn = 1;
        else if (aAuthor < bAuthor) toReturn = -1;
        else toReturn = 0;
        break;
      case 'read': 
        console.log('read');
        toReturn = (a === b) ? 0 : a ? -1 : 1;
        break;
      default:
        return 1;
    }
    return order === 'asc' ? toReturn : toReturn * -1;
  }

  const getBook = (userBook) => {
    return props.booksData.books.find((book) => {
      return book._id === userBook.bookId && props.user.id === userBook.userId;
    });
  }

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell
              sortDirection={orderBy === 'title' ? order : false}
            >
              <TableSortLabel
                active={orderBy === 'title'}
                direction={orderBy === 'title' ? order : 'asc'}
                onClick={() => {
                  if (orderBy !== 'title') {
                    setOrderBy('title');
                    setOrder('asc');
                  } else {
                    setOrder(order === 'asc' ? 'desc' : 'asc')
                  }
                }}
              >
                Title
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === 'author' ? order : false}
            >
              <TableSortLabel
                active={orderBy === 'author'}
                direction={orderBy === 'author' ? order : 'asc'}
                onClick={() => {
                  if (orderBy !== 'author') {
                    setOrderBy('author');
                    setOrder('asc');
                  } else {
                    setOrder(order === 'asc' ? 'desc' : 'asc')
                  }
                }}
              >
                Author
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === 'read' ? order : false}
            >
              <TableSortLabel
                active={orderBy === 'read'}
                direction={orderBy === 'read' ? order : 'asc'}
                onClick={() => {
                  if (orderBy !== 'read') {
                    setOrderBy('read');
                    setOrder('asc');
                  } else {
                    setOrder(order === 'asc' ? 'desc' : 'asc')
                  }
                }}
              >
                Read?
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.booksData.userBooks.sort(compareBooks).map((userBook) => {
          const book = getBook(userBook);
          const authorArray = book.author.split(' ');
          return book ? (
            <TableRow key={userBook._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{authorArray[1]}, {authorArray[0]}</TableCell>
              <TableCell>{userBook.read ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ) : null;
        })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BooksTable;