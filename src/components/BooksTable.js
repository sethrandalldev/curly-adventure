import React from 'react';
import { 
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper
} from '@material-ui/core';

function BooksTable(props) {
  const getBook = (userBook) => {
    return props.booksData.books.find((book) => {
      return book._id === userBook.bookId && props.user.id === userBook.userId;
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Title</strong>
            </TableCell>
            <TableCell>
              <strong>Author</strong>
            </TableCell>
            <TableCell>
              <strong>Read?</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.booksData.userBooks.map((userBook) => {
          const book = getBook(userBook);
          return book ? (
            <TableRow key={userBook._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
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